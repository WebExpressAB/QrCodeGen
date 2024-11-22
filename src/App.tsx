import React, { useState } from "react";
import { QRGen } from "./qrgen";
import styles from "./App.module.css";
import { ColorPicker, ColorPickerChangeEvent } from "primereact/colorpicker";

type QRStyle = "squares" | "dots" | "fluid";

const App: React.FC = () => {
  const [formData, setFormData] = useState<{
    url: string;
    size: number;
    logoImage?: string;
    logoHeight: number;
    logoWidth: number;
    logoOpacity: number;
    qrStyle: QRStyle;
    eyeRadius: number;
    fileName: string;
    bgColor: string;
    fgColor: string;
  }>({
    url: "https://www.webexpress.se",
    size: 900,
    logoImage: "https://media.licdn.com/dms/image/v2/D4D0BAQGhwC4IauTzFw/company-logo_200_200/company-logo_200_200/0/1715932659088/webexpress_ab_logo?e=2147483647&v=beta&t=vD6B4dnP9d07pbL_CEo9z6SIv19A0Outej5VcEVaA4g",
    logoHeight: 200,
    logoWidth: 200,
    logoOpacity: 0.8,
    qrStyle: "squares",
    eyeRadius: 5,
    fileName: "example_qr_code",
    bgColor: "#ffffff",
    fgColor: "#000000",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? Number(value) : value;
    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue as any,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    if (!target || !target.files) return;

    if (target.type === "text") {
      setFormData((prev) => ({
        ...prev,
        logoImage: target.value,
      }));
    } else if (target.files[0]) {
      const file = target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData((prev) => ({
            ...prev,
            logoImage: event.target!.result as string,
          }));
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (colorName: "bgColor" | "fgColor", value: any) => {
    let normalizedValue: string | null = null;

    if (typeof value === "string") {
      normalizedValue = `#${value}`; // Already a valid string
    } else if (value?.hex) {
      normalizedValue = value.hex; // Normalize from RGB or HSB if needed
    }


    if (colorName == "bgColor") {
      setFormData((prev) => ({
        ...prev,
        [colorName]: normalizedValue || "#ffffff", // Fallback to a default color
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [colorName]: normalizedValue || "#ffffff", // Fallback to a default color
      }));
    }


  };

  return (
    <div className={styles.container}>
      <div className={styles.qrcode}>
        <QRGen
          url={formData.url}
          size={formData.size}
          logoImage={formData.logoImage}
          logoHeight={formData.logoHeight}
          logoWidth={formData.logoWidth}
          logoOpacity={formData.logoOpacity}
          qrStyle={formData.qrStyle}
          eyeRadius={formData.eyeRadius}
          fileName={formData.fileName}
          bgColor={formData.bgColor}
          fgColor={formData.fgColor}
        />
      </div>
      <div>
        <form className={styles.formcontainer}>
          <div>
            <label htmlFor="url">QR Code URL:</label>
            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex-1 flex flex-column align-items-center">
            <label htmlFor="bgColor" className="font-bold block mb-2">
              Background Color:
            </label>
            <ColorPicker
              inputId="bgColor"
              format="hex"
              value={formData.bgColor}
              onChange={(e: ColorPickerChangeEvent) =>
                handleColorChange("bgColor", e.value || "#ffffff")
              }
              className="mb-3"
            />
            <input type="text" value={formData.bgColor} name="bgColor" onChange={handleInputChange} />
          </div>

          <div className="flex-1 flex flex-column align-items-center">
            <label htmlFor="fgColor" className="font-bold block mb-2">
              Foreground Color:
            </label>
            <ColorPicker
              inputId="fgColor"
              format="hex"
              value={formData.fgColor}
              onChange={(e: ColorPickerChangeEvent) =>
                handleColorChange("fgColor", e.value || "#000000")
              }
              className="mb-3"
            />
            <input type="text" value={formData.fgColor} name="fgColor" onChange={handleInputChange} />
          </div>

          {/* <div>
            <label htmlFor="size">QR Code Size:</label>
            <input
              type="range"
              name="size"
              min="100"
              max="2000"
              step="10"
              value={formData.size}
              onChange={handleInputChange}
            />
            <span>{formData.size}px</span>
          </div> */}

          <div>
            <label htmlFor="logoImage">Logo Image:</label>
            <input
              type="text"
              name="logoImage"
              value={formData.logoImage || ""}
              placeholder="Enter image URL or upload an image"
              onChange={handleImageChange}
            />
            <button
              type="button"
              onClick={() => {
                // Trigger file input programmatically
                document.getElementById("fileInput")?.click();
              }}
            >
              Insert Image
            </button>
            <input
              type="file"
              id="fileInput"
              accept=".png, .jpg, .jpeg"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>

          <div>
            <label htmlFor="logoWidth">Logo Width:</label>
            <input
              type="range"
              name="logoWidth"
              min="100"
              max="600"
              step="1"
              value={formData.logoWidth}
              onChange={(e) => {
                const newSize = Number(e.target.value);
                setFormData((prev) => ({
                  ...prev,
                  logoWidth: newSize,
                }));
              }}
            />
            <span>{formData.logoWidth}px</span>
          </div>

          <div>
            <label htmlFor="logoHeight">Logo Height:</label>
            <input
              type="range"
              name="logoHeight"
              min="50"
              max="400"
              step="1"
              value={formData.logoHeight}
              onChange={(e) => {
                const newSize = Number(e.target.value);
                setFormData((prev) => ({
                  ...prev,
                  logoHeight: newSize,
                }));
              }}
            />
            <span>{formData.logoHeight}px</span>
          </div>

          <div>
            <label htmlFor="logoOpacity">Logo Opacity:</label>
            <input
              type="range"
              name="logoOpacity"
              min="0"
              max="1"
              step="0.1"
              value={formData.logoOpacity}
              onChange={handleInputChange}
            />
            <span>{formData.logoOpacity}</span>
          </div>

          <div>
            <label htmlFor="qrStyle">QR Style:</label>
            <select
              name="qrStyle"
              value={formData.qrStyle}
              onChange={handleInputChange}
            >
              <option value="dots">Dots</option>
              <option value="squares">Squares</option>
              <option value="fluid">Fluid</option>
            </select>
          </div>

          <div>
            <label htmlFor="eyeRadius">Eye Radius:</label>
            <input
              type="range"
              name="eyeRadius"
              min="0"
              max="20"
              step="1"
              value={formData.eyeRadius}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  eyeRadius: Number(e.target.value),
                }))
              }
            />
            <span>{formData.eyeRadius}px</span>
          </div>

          <div>
            <label htmlFor="fileName">File Name:</label>
            <input
              type="text"
              name="fileName"
              value={formData.fileName}
              onChange={handleInputChange}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
