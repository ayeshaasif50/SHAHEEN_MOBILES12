import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./AddProduct.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const initialForm = {
  name: "",
  brand: "",
  series: "",
  category: "Mobiles",
  badge: "",
  price: "",
  oldPrice: "",
  ram: "",
  storage: "",
  stock: "",
  isPTA: "true",
  description: "",
  specs: { display: "", processor: "", camera: "", battery: "", os: "", sim: "" },
  features: [],
  variants: [],
  colors: []
};

const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const AddProduct = () => {
  const [form, setForm] = useState(initialForm);
  const [imageFiles, setImageFiles] = useState([]); // [{ id, file, preview, key }]
  const [primaryImageId, setPrimaryImageId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // cleanup previews on unmount
    return () => {
      imageFiles.forEach((f) => URL.revokeObjectURL(f.preview));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uploadFile = async (file, token) => {
    const fd = new FormData();
    fd.append("image", file);
    const res = await axios.post(`${API}/api/upload`, fd, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.imageUrl;
  };

  const uploadFiles = async (files, token) => {
    const urls = [];
    for (let i = 0; i < files.length; i++) {
      const url = await uploadFile(files[i], token);
      urls.push(url);
    }
    return urls;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in form.specs) {
      setForm((p) => ({ ...p, specs: { ...p.specs, [name]: value } }));
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  };

  // Image handlers (fixed append behavior + dedupe)
  const onGeneralImagesChange = (e) => {
    const incoming = Array.from(e.target.files || []);
    if (incoming.length === 0) return;

    const newItems = incoming.map((file) => ({
      id: makeId(),
      file,
      preview: URL.createObjectURL(file),
      key: `${file.name}-${file.size}`
    }));

    setImageFiles((prev) => {
      // keep order: existing first, then new; but dedupe by key
      const map = new Map(prev.map((p) => [p.key, p]));
      newItems.forEach((n) => map.set(n.key, n));
      const arr = Array.from(map.values());
      if (!primaryImageId && arr.length > 0) setPrimaryImageId(arr[0].id);
      return arr;
    });

    e.target.value = null;
  };

  const onPrimaryInput = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const item = { id: makeId(), file: f, preview: URL.createObjectURL(f), key: `${f.name}-${f.size}` };
    setImageFiles((prev) => {
      const map = new Map(prev.map((p) => [p.key, p]));
      map.set(item.key, item); // add/replace
      const arr = Array.from(map.values());
      setPrimaryImageId(item.id);
      return arr;
    });
    e.target.value = null;
  };

  const removeImageById = (id) => {
    setImageFiles((prev) => {
      const removed = prev.find((p) => p.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      const rem = prev.filter((p) => p.id !== id);
      if (primaryImageId === id) {
        setPrimaryImageId(rem.length > 0 ? rem[0].id : null);
      }
      return rem;
    });
  };

  // keep function in case needed later
  const setPrimary = (id) => setPrimaryImageId(id);

  // Features
  const addFeature = (v = "") => setForm((p) => ({ ...p, features: [...p.features, v] }));
  const updateFeature = (i, v) => { const arr = [...form.features]; arr[i] = v; setForm((p) => ({ ...p, features: arr })); };
  const removeFeature = (i) => setForm((p) => ({ ...p, features: form.features.filter((_, idx) => idx !== i) }));

  // Variants
  const addVariant = () => setForm((p) => ({ ...p, variants: [...p.variants, { ram: "", storage: "", price: "" }] }));
  const updateVariant = (i, k, v) => { const arr = [...form.variants]; arr[i] = { ...arr[i], [k]: v }; setForm((p) => ({ ...p, variants: arr })); };
  const removeVariant = (i) => setForm((p) => ({ ...p, variants: form.variants.filter((_, idx) => idx !== i) }));

  // Colors
  const addColor = () => setForm((p) => ({ ...p, colors: [...p.colors, { name: "", hex: "#000000", images: [] }] }));
  const updateColor = (i, k, v) => { const arr = [...form.colors]; arr[i] = { ...arr[i], [k]: v }; setForm((p) => ({ ...p, colors: arr })); };
  const removeColor = (i) => setForm((p) => ({ ...p, colors: form.colors.filter((_, idx) => idx !== i) }));
  const addColorImages = (i, files) => {
    const arr = [...form.colors];
    arr[i]._files = files; // transient, will upload on submit
    setForm((p) => ({ ...p, colors: arr }));
  };

  const resetForm = () => {
    imageFiles.forEach((f) => URL.revokeObjectURL(f.preview));
    setForm(initialForm);
    setImageFiles([]);
    setPrimaryImageId(null);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const TOKEN = localStorage.getItem("adminToken");
    if (!TOKEN) return toast.error("Admin login required!");
    if (!form.name || !form.brand || !form.price) return toast.error("Name, brand & price required");

    setLoading(true);
    try {
      const filesToUpload = imageFiles.map((f) => f.file);
      let uploadedImages = [];
      if (filesToUpload.length > 0) uploadedImages = await uploadFiles(filesToUpload, TOKEN);

      const idToUrl = {};
      imageFiles.forEach((item, idx) => { idToUrl[item.id] = uploadedImages[idx] || ""; });

      const mainImageUrl = primaryImageId ? idToUrl[primaryImageId] || uploadedImages[0] || "" : uploadedImages[0] || "";

      const colors = await Promise.all(
        (form.colors || []).map(async (c) => {
          const colorObj = { name: c.name || "", hex: c.hex || "", images: c.images || [] };
          if (c._files && c._files.length > 0) {
            const urls = await uploadFiles(Array.from(c._files), TOKEN);
            colorObj.images = urls;
          }
          return colorObj;
        })
      );

      const variants = (form.variants || []).map((v) => ({
        ram: String(v.ram || ""),
        storage: String(v.storage || ""),
        price: Number(v.price) || 0
      }));

      const payload = {
        name: form.name,
        brand: form.brand,
        series: form.series,
        category: form.category,
        price: Number(form.price) || 0,
        oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
        ram: form.ram ? String(form.ram) : "",
        storage: form.storage ? String(form.storage) : "",
        specs: { ...form.specs },
        colors,
        variants,
        features: form.features || [],
        image: mainImageUrl || "",
        images: uploadedImages,
        stock: Number(form.stock) || 0,
        badge: form.badge || "",
        isPTA: form.isPTA === "true",
        isUsed: false,
        isFeatured: false,
        description: form.description || "",
        reviews: [],
        rating: 0,
        numReviews: 0
      };

      await axios.post(`${API}/api/products`, payload, { headers: { Authorization: `Bearer ${TOKEN}` } });
      toast.success("Product added");
      resetForm();
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error(err.response?.data?.message || "Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product">
      <div className="page-header header-with-actions">
        <div>
          <h2 className="page-title">Add New Product</h2>
          <div className="muted">Add a new mobile or accessory to your inventory</div>
        </div>
        <div>
          <button className="btn-save" onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save Product"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="top-grid">
          <div className="left-col">
            <div className="form-card">
              <div className="card-title">Images</div>

              <div className="image-input-row">
                <div className="image-input">
                  <label className="small-label">Primary / Thumbnail</label>
                  <input type="file" accept="image/*" onChange={onPrimaryInput} className="file-input" />
                  <div className="muted small">Best: square image, 1200x1200</div>
                </div>
                <div className="image-input">
                  <label className="small-label">Add Multiple Images</label>
                  <input type="file" accept="image/*" multiple onChange={onGeneralImagesChange} className="file-input" />
                  <div className="muted small">Existing images won't be removed</div>
                </div>
              </div>

              <div className="thumbnails-grid">
                {imageFiles.length === 0 && <div className="thumb-placeholder muted">No images added</div>}
                {imageFiles.map((img) => (
                  <div className="thumb" key={img.id}>
                    <img src={img.preview} alt="thumb" />
                    <div className="thumb-actions">
                      <button type="button" className="btn-small danger" onClick={() => removeImageById(img.id)}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-card">
              <div className="card-title">Colors</div>
              <button type="button" className="link-btn" onClick={addColor}>+ Add Color</button>
              <div className="colors-list">
                {form.colors.length === 0 && <div className="muted">No colors defined</div>}
                {form.colors.map((c, idx) => (
                  <div className="color-row" key={idx}>
                    <input placeholder="Color name" value={c.name} onChange={(e) => updateColor(idx, "name", e.target.value)} />
                    <input type="color" value={c.hex || "#000000"} onChange={(e) => updateColor(idx, "hex", e.target.value)} />
                    <input type="file" accept="image/*" multiple onChange={(e) => addColorImages(idx, e.target.files)} className="file-input" />
                    <button type="button" className="link-btn" onClick={() => removeColor(idx)}>Remove</button>
                    <div className="color-previews">
                      {(c._files ? Array.from(c._files) : (c.images || [])).map((fileOrUrl, i2) => {
                        const src = typeof fileOrUrl === "string" ? fileOrUrl : URL.createObjectURL(fileOrUrl);
                        return <img key={i2} src={src} alt={`color-${idx}-${i2}`} className="color-thumb" />;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-card">
              <div className="card-title">Description</div>
              <div className="form-group">
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Write product description..." />
              </div>
            </div>

            <div className="form-card">
              <div className="card-title">Features</div>
              <button type="button" className="link-btn" onClick={() => addFeature("")}>+ Add Feature</button>
              <div style={{ marginTop: 8 }}>
                {form.features.length === 0 && <div className="muted">No features added</div>}
                {form.features.map((f, idx) => (
                  <div className="feature-row" key={idx}>
                    <input value={f} onChange={(e) => updateFeature(idx, e.target.value)} />
                    <button type="button" className="link-btn" onClick={() => removeFeature(idx)}>Remove</button>
                  </div>
                ))}
                <small className="muted">Example: "Large Display", "5160mAh Battery"</small>
              </div>
            </div>
          </div>

          <div className="right-col">
            <div className="form-card">
              <div className="card-title">General</div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Product Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Brand *</label>
                  <input name="brand" value={form.brand} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>Series</label>
                  <input name="series" value={form.series} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={form.category} onChange={handleChange}>
                    <option>Mobiles</option>
                    <option>Tablets</option>
                    <option>Accessories</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Badge</label>
                  <select name="badge" value={form.badge} onChange={handleChange}>
                    <option value="">None</option>
                    <option value="Hot">Hot</option>
                    <option value="New">New</option>
                    <option value="Sale">Sale</option>
                    <option value="BEST SELLER">BEST SELLER</option>
                    <option value="PRO+">PRO+</option>
                    <option value="ULTRA">ULTRA</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-card">
              <div className="card-title">Price & Stock</div>
              <div className="form-grid-3">
                <div className="form-group">
                  <label>Sale Price *</label>
                  <input type="number" name="price" value={form.price} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Old Price</label>
                  <input type="number" name="oldPrice" value={form.oldPrice} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Stock Quantity</label>
                  <input type="number" name="stock" value={form.stock} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>RAM (e.g., 6GB)</label>
                  <input name="ram" value={form.ram} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Storage (e.g., 128GB)</label>
                  <input name="storage" value={form.storage} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>PTA Approved</label>
                  <select name="isPTA" value={form.isPTA} onChange={handleChange}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-card">
              <div className="card-title">Variants</div>
              <button type="button" className="link-btn" onClick={addVariant}>+ Add Variant</button>
              <div className="variants-list">
                {form.variants.length === 0 && <div className="muted">No variants added</div>}
                {form.variants.map((v, idx) => (
                  <div className="variant-row" key={idx}>
                    <input placeholder="RAM (6GB)" value={v.ram} onChange={(e) => updateVariant(idx, "ram", e.target.value)} />
                    <input placeholder="Storage (128GB)" value={v.storage} onChange={(e) => updateVariant(idx, "storage", e.target.value)} />
                    <input placeholder="Price" type="number" value={v.price} onChange={(e) => updateVariant(idx, "price", e.target.value)} />
                    <button type="button" className="link-btn" onClick={() => removeVariant(idx)}>Remove</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-card">
              <div className="card-title">Specifications</div>
              <div className="form-grid-3">
                {Object.keys(form.specs).map((key) => (
                  <div className="form-group" key={key}>
                    <label>{key}</label>
                    <input name={key} value={form.specs[key]} onChange={handleChange} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={loading}>{loading ? "Adding..." : "Add Product"}</button>
          <button type="button" className="btn-reset" onClick={resetForm}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;