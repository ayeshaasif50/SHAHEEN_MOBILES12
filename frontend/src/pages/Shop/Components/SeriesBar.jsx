const SeriesBar = ({ brand, selectedSeries, onSeriesClick, onReset }) => {
  return (
    <div className="series-section">
      <h3>{brand.name} Series</h3>
      <div className="series-row">

        {/* All button */}
        <button
          className={!selectedSeries ? 'active' : ''}
          onClick={onReset}
        >
          All {brand.name}
        </button>

        {/* Series buttons */}
        {brand.series.map((s) => (
          <button
            key={s}
            className={selectedSeries === s ? 'active' : ''}
            onClick={() => onSeriesClick(s)}
          >
            {s}
          </button>
        ))}

      </div>
    </div>
  );
};

export default SeriesBar;