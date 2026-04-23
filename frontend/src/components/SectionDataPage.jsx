import React, { useMemo, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReactModule from "highcharts-react-official";
import geostatLogo from "../assets/images/geostatlogo.svg";
import eduLogo from "../assets/images/edu.svg";
import logoS4Ge from "../assets/images/logo-s4.png";
import logoS4En from "../assets/images/logo-s4-en.png";
import logoS5 from "../assets/images/logo-s5.svg";
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
              <svg width="35" height="33" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M33.9062 28.4389H18.5937C17.99 28.4389 17.5 27.9489 17.5 27.3451C17.5 26.7414 17.5 6.07393 17.5 5.47018C17.5 4.86643 17.99 4.37643 18.5937 4.37643H33.9062C34.51 4.37643 35 4.86643 35 5.47018V27.3451C35 27.9489 34.51 28.4389 33.9062 28.4389Z" fill="#ECEFF1"></path>
                <path d="M22.9687 10.939H18.5937C17.99 10.939 17.5 10.449 17.5 9.84524C17.5 9.24149 17.99 8.7515 18.5937 8.7515H22.9687C23.5725 8.7515 24.0625 9.24149 24.0625 9.84524C24.0625 10.449 23.5725 10.939 22.9687 10.939Z" fill="#388E3C"></path>
                <path d="M22.9687 15.314H18.5937C17.99 15.314 17.5 14.824 17.5 14.2202C17.5 13.6165 17.99 13.1265 18.5937 13.1265H22.9687C23.5725 13.1265 24.0625 13.6165 24.0625 14.2202C24.0625 14.824 23.5725 15.314 22.9687 15.314Z" fill="#388E3C"></path>
                <path d="M22.9687 19.689H18.5937C17.99 19.689 17.5 19.199 17.5 18.5952C17.5 17.9915 17.99 17.5015 18.5937 17.5015H22.9687C23.5725 17.5015 24.0625 17.9915 24.0625 18.5952C24.0625 19.199 23.5725 19.689 22.9687 19.689Z" fill="#388E3C"></path>
                <path d="M22.9687 24.064H18.5937C17.99 24.064 17.5 23.574 17.5 22.9702C17.5 22.3665 17.99 21.8765 18.5937 21.8765H22.9687C23.5725 21.8765 24.0625 22.3665 24.0625 22.9702C24.0625 23.574 23.5725 24.064 22.9687 24.064Z" fill="#388E3C"></path>
                <path d="M29.5308 10.939H27.3433C26.7395 10.939 26.2495 10.449 26.2495 9.84527C26.2495 9.24153 26.7395 8.75153 27.3433 8.75153H29.5308C30.1345 8.75153 30.6245 9.24153 30.6245 9.84527C30.6245 10.449 30.1345 10.939 29.5308 10.939Z" fill="#388E3C"></path>
                <path d="M29.5308 15.314H27.3433C26.7395 15.314 26.2495 14.824 26.2495 14.2202C26.2495 13.6165 26.7395 13.1265 27.3433 13.1265H29.5308C30.1345 13.1265 30.6245 13.6165 30.6245 14.2202C30.6245 14.824 30.1345 15.314 29.5308 15.314Z" fill="#388E3C"></path>
                <path d="M29.5308 19.689H27.3433C26.7395 19.689 26.2495 19.199 26.2495 18.5952C26.2495 17.9915 26.7395 17.5015 27.3433 17.5015H29.5308C30.1345 17.5015 30.6245 17.9915 30.6245 18.5952C30.6245 19.199 30.1345 19.689 29.5308 19.689Z" fill="#388E3C"></path>
                <path d="M29.5308 24.064H27.3433C26.7395 24.064 26.2495 23.574 26.2495 22.9702C26.2495 22.3665 26.7395 21.8765 27.3433 21.8765H29.5308C30.1345 21.8765 30.6245 22.3665 30.6245 22.9702C30.6245 23.574 30.1345 24.064 29.5308 24.064Z" fill="#388E3C"></path>
                <path d="M19.2915 0.253036C19.0422 0.0452238 18.7075 -0.0444636 18.3925 0.0211613L0.892499 3.30241C0.374062 3.39866 0 3.84928 0 4.37647V28.4389C0 28.9639 0.374062 29.4167 0.892499 29.513L18.3925 32.7942C18.4581 32.8074 18.5259 32.8139 18.5937 32.8139C18.8475 32.8139 19.0947 32.7264 19.2915 32.5624C19.5431 32.3545 19.6875 32.0439 19.6875 31.7202V1.09522C19.6875 0.769285 19.5431 0.460848 19.2915 0.253036Z" fill="#2E7D32"></path>
                <path d="M15.0414 20.063L11.583 16.1102L15.0808 11.6127C15.4526 11.1358 15.3651 10.4489 14.8904 10.0771C14.4158 9.70519 13.7289 9.79269 13.3548 10.2674L10.1151 14.4324L7.38515 11.313C6.98483 10.8536 6.29358 10.8121 5.84296 11.2102C5.38796 11.6083 5.34202 12.2996 5.74015 12.7524L8.74796 16.1911L5.69859 20.1111C5.32671 20.588 5.41421 21.2749 5.8889 21.6467C6.09015 21.802 6.32858 21.8764 6.56265 21.8764C6.88858 21.8764 7.21015 21.732 7.42671 21.4542L10.2158 17.8667L13.3964 21.5002C13.6129 21.7495 13.9148 21.8764 14.2189 21.8764C14.4748 21.8764 14.7308 21.7867 14.9386 21.6052C15.3936 21.207 15.4395 20.5158 15.0414 20.063Z" fill="#FAFAFA"></path>
              </svg>
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
              <div>{language === "EN" ? "Download" : "გადმოწერა"}</div>
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
