import React, { useState } from "react";
import { QRGen } from "./qrgen";
import { ColorPicker, ColorPickerChangeEvent } from "primereact/colorpicker";
import { Card, Container, Col, Button, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

type QRStyle = "squares" | "dots" | "fluid";

const App: React.FC = () => {
  const [formData, setFormData] = useState<{
    url: string;
    size: number;
    logoImage?: string;
    logoScale: number;
    logoOpacity: number;
    qrStyle: QRStyle;
    eyeRadius: number;
    fileName: string;
    bgColor: string;
    fgColor: string;
    logoAspectRatio: number;
  }>({
    url: "https://www.webexpress.se",
    size: 450,
    logoImage:
      "https://media.licdn.com/dms/image/v2/D4D0BAQGhwC4IauTzFw/company-logo_200_200/company-logo_200_200/0/1715932659088/webexpress_ab_logo?e=2147483647&v=beta&t=vD6B4dnP9d07pbL_CEo9z6SIv19A0Outej5VcEVaA4g",
    logoScale: 20,
    logoOpacity: 0.8,  // Definiera opacitet
    qrStyle: "squares",
    eyeRadius: 5,
    fileName: "example_qr_code",
    bgColor: "#ffffff",
    fgColor: "#000000",
    logoAspectRatio: 1,
  }); 

  // Beräkna logotypens dimensioner baserat på formData
  const logoWidth = (formData.size * formData.logoScale) / 100;
  const logoHeight = logoWidth / formData.logoAspectRatio; // Proportionellt beroende på bildens aspect ratio

  // Hantera förändringar i inputfält
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

  // Hantera uppladdning och ändring av logotypbild
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    if (!target || !target.files) return;

    const file = target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target?.result) {
        const img = new Image();
        img.onload = () => {
          //Kontrolelrar om det är en kvadrat eller rektangel, kvadrat = 1
          const aspectRatio = img.width / img.height;
          //Se till att bilden behåller sina dimensioner men ändrar så att den är 20% av QR koden
          setFormData((prev) => ({
            ...prev,
            logoImage: event.target!.result as string,
            logoScale: 20, // Återställ till standard storlek
            logoWidth: img.width, // Använd bildens ursprungliga bredd
            logoHeight: img.height, // Använd bildens ursprungliga höjd
            logoAspectRatio: aspectRatio, // Beräkna aspect ratio
          }));
        };
        img.src = event.target!.result as string; // Ladda bilden och hämta dimensionerna
      }
    };

    reader.readAsDataURL(file);
  };

  // Hantera ändring av färger via ColorPicker
  const handleColorChange = (colorName: "bgColor" | "fgColor", value: any) => {
    const normalizedValue =
      typeof value === "string" ? `#${value}` : value?.hex || "#ffffff";

    setFormData((prev) => ({
      ...prev,
      [colorName]: normalizedValue,
    }));
  };

  return (
    <Container>
      
      <div className="text-center">
        {/* QR-koden */}
        <QRGen
          url={formData.url}
          size={formData.size}
          logoImage={formData.logoImage}
          logoHeight={logoHeight}
          logoWidth={logoWidth}
          logoOpacity={formData.logoOpacity}  
          qrStyle={formData.qrStyle}
          eyeRadius={formData.eyeRadius}
          fileName={formData.fileName}
          bgColor={formData.bgColor}
          fgColor={formData.fgColor}
        />

        {/* Formulär för att välja QR-kodens inställningar */}
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={7}>
            <Card className="mt-1 p-3" >
              <form >
                <div>
                  <label htmlFor="url">QR Code URL:</label>
                  <input
                    type="text"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    className="ms-1 mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="logoImage">Logo Image:</label>
                  <input
                    className="ms-1 mt-3"
                    type="text"
                    name="logoImage"
                    value={formData.logoImage || ""}
                    placeholder="Enter image URL or upload an image"
                    onChange={handleImageChange}
                  />
                  <Button 
                    className="ms-2 mb-1"
                    size="sm"
                    type="button"
                    onClick={() => document.getElementById("fileInput")?.click()}
                  >
                    Insert Image
                  </Button>
                  <input
                    type="file"
                    id="fileInput"
                    accept=".png, .jpg, .jpeg"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </div>
                <div>
              <label htmlFor="logoScale">Logo Size:</label>
              <input
              className="ms-1 mt-3"
               type="range"
               name="logoScale"
               min="10"
               max={formData.logoAspectRatio === 1 ? 30 : 40} // Kvadrat max 30%, rektangel max 40%
               step="1"
               value={formData.logoScale}
               onChange={(e) => {
            const newScale = Number(e.target.value);
            setFormData((prev) => ({
               ...prev,
               logoScale: newScale,
              }));
             }}
          />
          {/*Ändra skalan så att 30/40% == 100% */}
          <span>{formData.logoAspectRatio === 1 ? (formData.logoScale / 30 * 100).toFixed(0) : (formData.logoScale / 40 * 100).toFixed(0)}%</span> {/* Omvandla till 100% på max */}
        </div>
        <div>
          <label htmlFor="logoOpacity">Logo Opacity:</label>
          <input
          className="ms-1 mt-3"
          type="range"
          name="logoOpacity"
          min="0"
          max="1"
          step="0.1"
          value={formData.logoOpacity}
          onChange={(e) => {
            const newOpacity = Number(e.target.value);
            setFormData((prev) => ({
            ...prev,
             logoOpacity: newOpacity,
         }));
       }}
     />
         {/* Omvandla opacity till procent (0–100) */}
         <span>{Math.round(formData.logoOpacity * 100)}%</span>
          </div>
          <div>
            <label htmlFor="qrStyle">QR Style:</label>
            <select
              name="qrStyle"
              value={formData.qrStyle}
              onChange={handleInputChange}
              className="ms-1 mt-3"
            >
              <option value="dots">Dots</option>
              <option value="squares">Squares</option>
              <option value="fluid">Fluid</option>
            </select>
          </div>
          <div>
            <label htmlFor="eyeRadius">Eye Radius:</label>
            <input
            className="ms-1 mt-3"
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
                  <label htmlFor="bgColor">Background Color:</label>
                  <ColorPicker
                  className="ms-1 mt-3"
                    inputId="bgColor"
                    format="hex"
                    value={formData.bgColor}
                    onChange={(e: ColorPickerChangeEvent) =>
                      handleColorChange("bgColor", e.value || "#ffffff")
                    }
                  />
                  <input
                  className="ms-1 mt-3"
                    type="text"
                    value={formData.bgColor}
                    name="bgColor"
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="fgColor">Foreground Color:</label>
                  <ColorPicker
                  className="ms-1 mt-3"
                    inputId="fgColor"
                    format="hex"
                    value={formData.fgColor}
                    onChange={(e: ColorPickerChangeEvent) =>
                      handleColorChange("fgColor", e.value || "#000000")
                    }
                  />
                  <input
                  className="ms-1 mt-3"
                    type="text"
                    value={formData.fgColor}
                    name="fgColor"
                    onChange={handleInputChange}
                  />
                </div>
              </form>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default App;