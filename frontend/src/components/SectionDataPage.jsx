import React, { useMemo, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReactModule from "highcharts-react-official";
import geostatLogo from "../assets/images/geostatlogo.svg";
import eduLogo from "../assets/images/edu.svg";
import logoS4Ge from "../assets/images/logo-s4.png";
import logoS4En from "../assets/images/logo-s4-en.png";
import logoS5 from "../assets/images/logo-s5.svg";
import fileIcon from "../assets/images/document.png";
import downloadIcon from "../assets/images/google-docs.png";
import barchartIcon from "../assets/images/barchart.png";
import linechartIcon from "../assets/images/linechart.png";
import "../styles/SectionDataPage.scss";

const HighchartsReact =
  HighchartsReactModule?.default ||
  HighchartsReactModule?.HighchartsReact ||
  HighchartsReactModule;

const defaultFilterData = [
  {
    key: "multi",
    categories: [1, 4],
    imageKey: "geostat",
    imgWidth: 120,
    labelGE: "საქსტატი და სამინისტროს ღია მონაცემები",
    labelEN: "Geostat and Ministry Open Data",
  },
  {
    key: "filter2",
    categories: [2],
    imageKey: "edu",
    imgWidth: 100,
    labelGE: "განათლების მიმართულების მონაცემები",
    labelEN: "Education Related Data",
  },
  {
    key: "filter3",
    categories: [3],
    imageKey: "s4",
    imgWidth: 55,
    labelGE: "სოციალური მომსახურების სააგენტო",
    labelEN: "Social Service Agency",
  },
  {
    key: "filter4",
    categories: [4],
    imageKey: "s5",
    imgWidth: 120,
    labelGE: "მუნიციპალური და პარტნიორი წყაროები",
    labelEN: "Municipal and Partner Sources",
  },
];

const imageMap = {
  geostat: geostatLogo,
  edu: eduLogo,
  s5: logoS5,
};

const resolveFilterImage = (imageKey, language) => {
  if (imageKey === "s4") {
    return language === "EN" ? logoS4En : logoS4Ge;
  }
  return imageMap[imageKey] || geostatLogo;
};

const createDefaultFilesData = ({ sectionKey, titleGE, titleEN }) => [
  {
    id: 1,
    categories: [1],
    titleGE: `${titleGE} - ძირითადი მაჩვენებლები, 2025`,
    titleEN: `${titleEN} - Main Indicators, 2025`,
    href: `/files/indicators/${sectionKey}-main.pdf`,
    chartdata: {
      labels: ["2022", "2023", "2024", "2025"],
      bar: [120, 140, 165, 171],
      line: [118, 130, 160, 171],
    },
  },
  {
    id: 2,
    categories: [2],
    titleGE: `${titleGE} - თემატური მიმოხილვა`,
    titleEN: `${titleEN} - Thematic Overview`,
    href: `/files/indicators/${sectionKey}-overview.pdf`,
  },
  {
    id: 3,
    categories: [3],
    titleGE: `${titleGE} - დეტალური ანგარიში`,
    titleEN: `${titleEN} - Detailed Report`,
    href: `/files/indicators/${sectionKey}-detailed.pdf`,
    chartdata: {
      labels: ["2022", "2023", "2024", "2025"],
      bar: [90, 110, 133, 149],
      line: [85, 108, 129, 149],
    },
  },
  {
    id: 4,
    categories: [4],
    titleGE: `${titleGE} - რეგიონული ტენდენციები`,
    titleEN: `${titleEN} - Regional Trends`,
    href: `/files/indicators/${sectionKey}-regional.pdf`,
  },
];

const SectionDataPage = ({
  language,
  slideImg,
  titleGE,
  titleEN,
  coverPdfNumber,
  sectionKey,
  filterData = defaultFilterData,
  filesData,
}) => {
  const effectiveFilesData = useMemo(
    () => filesData || createDefaultFilesData({ sectionKey, titleGE, titleEN }),
    [filesData, sectionKey, titleGE, titleEN],
  );

  const initialFilters = useMemo(() => {
    const state = {};
    filterData.forEach((f) => {
      state[f.key] = true;
    });
    return state;
  }, [filterData]);

  const [filters, setFilters] = useState(initialFilters);
  const [openCharts, setOpenCharts] = useState({});
  const [chartType, setChartType] = useState({});
  const [downloaded, setDownloaded] = useState({});

  const activeCategories = useMemo(() => {
    const categorySet = new Set();
    filterData.forEach((filter) => {
      if (filters[filter.key]) {
        filter.categories.forEach((category) => categorySet.add(category));
      }
    });
    return categorySet;
  }, [filterData, filters]);

  const visibleFiles = useMemo(() => {
    return effectiveFilesData.filter((file) => file.categories.some((category) => activeCategories.has(category)));
  }, [effectiveFilesData, activeCategories]);

  const toggleFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleChart = (id) => {
    setOpenCharts((prev) => ({ ...prev, [id]: !prev[id] }));
    setChartType((prev) => ({ ...prev, [id]: prev[id] || "bar" }));
  };

  const setFileChartType = (id, type) => {
    setChartType((prev) => ({ ...prev, [id]: type }));
  };

  const getChartOptions = (file, activeType) => {
    const isLine = activeType === "line";
    const seriesData = isLine ? file.chartdata.line : file.chartdata.bar;

    return {
      chart: {
        type: isLine ? "line" : "column",
        backgroundColor: "transparent",
        height: 340,
        style: {
          fontFamily: "FiraGO",
        },
      },
      title: { text: null },
      credits: { enabled: false },
      legend: { enabled: false },
      xAxis: {
        categories: file.chartdata.labels || [],
        lineColor: "#8ea4c8",
        tickColor: "#8ea4c8",
        labels: {
          style: {
            color: "#37496d",
            fontSize: "12px",
          },
        },
      },
      yAxis: {
        title: { text: null },
        gridLineColor: "#dce5f5",
        labels: {
          style: {
            color: "#37496d",
            fontSize: "12px",
          },
        },
      },
      tooltip: {
        valueDecimals: 0,
      },
      plotOptions: {
        column: {
          borderRadius: 6,
          pointPadding: 0.12,
          groupPadding: 0.14,
        },
        line: {
          lineWidth: 3,
          marker: {
            enabled: true,
            radius: 4,
          },
        },
        series: {
          color: "#0066e0",
          animation: false,
        },
      },
      series: [
        {
          type: isLine ? "line" : "column",
          data: seriesData,
        },
      ],
    };
  };

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4 py-10 section-data-page">
      <div style={{ position: "relative", width: "100%" }}>
        <img
          src={slideImg}
          alt={language === "EN" ? titleEN : titleGE}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
        <button
          className="flex items-center overflow-hidden rounded-full cursor-pointer"
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            border: "1px solid #0066e0",
            background: "transparent",
          }}
          onClick={() =>
            window.open(
              `/coverpdf/${language === "EN" ? "eng" : "geo"}/${coverPdfNumber}.pdf`,
              "_blank",
            )
          }
        >
          <span
            className="px-5 py-1.5 font-medium"
            style={{
              color: "#0066e0",
              fontSize: "16px",
              fontWeight: "bold",
              fontFamily: "FiraGO",
            }}
          >
            {language === "EN" ? "See more" : "ნახვა"}
          </span>
          <span
            className="text-white flex items-center justify-center"
            style={{
              background: "#0066e0",
              fontSize: "20px",
              fontWeight: "bold",
              width: "42px",
              height: "42px",
            }}
          >
            ›
          </span>
        </button>
      </div>

      <h2
        className="font-bold mt-8 mb-4"
        style={{
          fontSize: "30px",
          color: "#37496d",
          textAlign: "center",
          fontFeatureSettings: '"case" on',
          fontFamily: "FiraGO",
        }}
      >
        {language === "EN" ? titleEN : titleGE}
      </h2>

      <div className="flex justify-center">
        <svg width="70" height="1" viewBox="0 0 70 1" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line y1="0.5" x2="70" y2="0.5" stroke="black" />
        </svg>
      </div>

      <p className="choosecat" style={{ fontFamily: "FiraGO" }}>
        {language === "EN" ? "Data Sources:" : "მონაცემთა წყაროები:"}
      </p>

      <div className="filelist-filter">
        {filterData.map((filter) => (
          <label key={filter.key} className={`filter-item ${filters[filter.key] ? "active" : ""}`}>
            <img src={resolveFilterImage(filter.imageKey, language)} alt="" style={{ width: `${filter.imgWidth}px` }} />
            <p style={{ fontFamily: "FiraGO", fontFeatureSettings: '"case" on' }}>
              {language === "EN" ? filter.labelEN : filter.labelGE}
            </p>
            <input
              type="checkbox"
              checked={filters[filter.key]}
              onChange={() => toggleFilter(filter.key)}
            />
          </label>
        ))}
      </div>

      <div className="filelist">
        {visibleFiles.map((file) => (
          <div key={file.id} className="filelist-item">
            <div className="image">
              <img src={fileIcon} alt="" width="42" height="42" />
            </div>
            <div className="title">{language === "EN" ? file.titleEN : file.titleGE}</div>
            {file.chartdata && (
              <a
                href="#"
                className={`show ${openCharts[file.id] ? "open" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  toggleChart(file.id);
                }}
                tabIndex={-1}
              >
                <svg width="50" height="52" viewBox="0 0 50 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="50" height="52" rx="15" fill="#0066E0" />
                  <path d="M33.3962 23H16.6038C16.1001 23 15.8188 23.4415 16.1308 23.743L24.527 31.8265C24.7673 32.0578 25.2301 32.0578 25.473 31.8265L33.8692 23.743C34.1812 23.4415 33.8999 23 33.3962 23Z" fill="white" />
                </svg>
              </a>
            )}
            <a
              className="download"
              href={file.href}
              target="_blank"
              rel="noreferrer"
              onClick={() => setDownloaded((prev) => ({ ...prev, [file.id]: true }))}
            >
              <div>{language === "EN" ? "Download" : "ჩამოტვირთვა"}</div>
              <img
                src={downloadIcon}
                alt=""
                width="28"
                height="28"
                className={`download-icon ${downloaded[file.id] ? "hidden" : ""}`}
              />
              <svg
                width="50"
                height="52"
                viewBox="0 0 50 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`downloaded-icon ${downloaded[file.id] ? "visible" : ""}`}
              >
                <rect width="50" height="52" rx="15" fill="#388E3C" />
                <path d="M31.9318 21.3551C31.4588 20.8815 30.6907 20.8818 30.2171 21.3551L22.5 29.0725L19.0701 25.6426C18.5965 25.169 17.8288 25.169 17.3552 25.6426C16.8816 26.1162 16.8816 26.8839 17.3552 27.3575L21.6424 31.6447C21.8791 31.8814 22.1894 32 22.4997 32C22.8101 32 23.1207 31.8817 23.3573 31.6447L31.9318 23.07C32.4054 22.5967 32.4054 21.8287 31.9318 21.3551Z" fill="white" />
              </svg>
            </a>

            {file.chartdata && openCharts[file.id] && (
              <div className="chart" data-id={file.id}>
                <div className="chartswitch">
                  <img
                    src={barchartIcon}
                    alt=""
                    className={`barchart ${(chartType[file.id] || "bar") === "bar" ? "active" : ""}`}
                    onClick={() => setFileChartType(file.id, "bar")}
                  />
                  <img
                    src={linechartIcon}
                    alt=""
                    className={`linechart ${chartType[file.id] === "line" ? "active" : ""}`}
                    onClick={() => setFileChartType(file.id, "line")}
                  />
                </div>
                <div className="chartdiv1" id={`chartdiv1-${file.id}`}>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={getChartOptions(file, chartType[file.id] || "bar")}
                  />
                </div>
                <div className="chartdiv2" id={`chartdiv2-${file.id}`}>
                  <HighchartsReact highcharts={Highcharts} options={getChartOptions(file, "line")} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionDataPage;
