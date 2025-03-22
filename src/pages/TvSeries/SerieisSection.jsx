import styles from "../../components/common-media/content.module.css";
import List from "../../components/Content/List";

export const SeriesSection = ({ title, series, emptyMessage }) => {
  // console.log("Received series for:", title, series);
  return (
    <div>
      <h1 className={styles.sub_headings}>{title}</h1>
      <div className={styles.content}>
        {series && series.length > 0 ? (
          <List cards={series} />
        ) : (
          <p>{emptyMessage}</p>
        )}
      </div>
      <hr />
    </div>
  );
};
