import React, { useState } from "react";
import { QRGen } from "../qrgen";
import styles from "./App.module.css";
import { ColorPicker, ColorPickerChangeEvent } from "primereact/colorpicker";
import { Container, Form, Row, Col, InputGroup, Button} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';


type QRStyle = "squares" | "dots" | "fluid";

const form = () => {
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
    formData,
  handleInputChange,
  handleImageChange,
  handleColorChange,
  setFormData,
}) => {
  return (
    <Form>
      {/* QR Code URL */}
      <Form.Group className="mb-3" controlId="url">
        <Form.Label>QR Code URL:</Form.Label>
        <Form.Control
          type="text"
          name="url"
          value={formData.url}
          onChange={handleInputChange}
        />
      </Form.Group>

      {/* Background Color */}
      <Form.Group as={Row} className="mb-3 align-items-center" controlId="bgColor">
        <Form.Label column sm="3">
          Background Color:
        </Form.Label>
        <Col sm="9">
          <div className="d-flex">
            <Form.Control
              type="text"
              value={formData.bgColor}
              name="bgColor"
              onChange={handleInputChange}
              className="me-2"
            />
            {/* Color Picker */}
            <input
              type="color"
              value={formData.bgColor}
              onChange={(e) => handleColorChange("bgColor", e.target.value)}
              style={{ width: "40px", height: "40px", border: "none" }}
            />
          </div>
        </Col>
      </Form.Group>

      {/* Foreground Color */}
      <Form.Group as={Row} className="mb-3 align-items-center" controlId="fgColor">
        <Form.Label column sm="3">
          Foreground Color:
        </Form.Label>
        <Col sm="9">
          <div className="d-flex">
            <Form.Control
              type="text"
              value={formData.fgColor}
              name="fgColor"
              onChange={handleInputChange}
              className="me-2"
            />
            {/* Color Picker */}
            <input
              type="color"
              value={formData.fgColor}
              onChange={(e) => handleColorChange("fgColor", e.target.value)}
              style={{ width: "40px", height: "40px", border: "none" }}
            />
          </div>
        </Col>
      </Form.Group>

      {/* Logo Image */}
      <Form.Group className="mb-3" controlId="logoImage">
        <Form.Label>Logo Image:</Form.Label>
        <Form.Control
          type="text"
          name="logoImage"
          value={formData.logoImage || ""}
          placeholder="Enter image URL or upload an image"
          onChange={handleImageChange}
        />
        <Form.Control
          type="file"
          accept=".png, .jpg, .jpeg"
          className="mt-2"
          onChange={handleImageChange}
        />
      </Form.Group>

      {/* Logo Width */}
      <Form.Group className="mb-3" controlId="logoWidth">
        <Form.Label>Logo Width:</Form.Label>
        <Form.Range
          name="logoWidth"
          min="100"
          max="600"
          value={formData.logoWidth}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              logoWidth: Number(e.target.value),
            }))
          }
        />
        <Form.Text>{formData.logoWidth}px</Form.Text>
      </Form.Group>

      {/* Logo Height */}
      <Form.Group className="mb-3" controlId="logoHeight">
        <Form.Label>Logo Height:</Form.Label>
        <Form.Range
          name="logoHeight"
          min="50"
          max="400"
          value={formData.logoHeight}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              logoHeight: Number(e.target.value),
            }))
          }
        />
        <Form.Text>{formData.logoHeight}px</Form.Text>
      </Form.Group>

      {/* Logo Opacity */}
      <Form.Group className="mb-3" controlId="logoOpacity">
        <Form.Label>Logo Opacity:</Form.Label>
        <Form.Range
          name="logoOpacity"
          min="0"
          max="1"
          step="0.1"
          value={formData.logoOpacity}
          onChange={handleInputChange}
        />
        <Form.Text>{formData.logoOpacity}</Form.Text>
      </Form.Group>

      {/* QR Style */}
      <Form.Group className="mb-3" controlId="qrStyle">
        <Form.Label>QR Style:</Form.Label>
        <Form.Select
          name="qrStyle"
          value={formData.qrStyle}
          onChange={handleInputChange}
        >
          <option value="dots">Dots</option>
          <option value="squares">Squares</option>
          <option value="fluid">Fluid</option>
        </Form.Select>
      </Form.Group>

      {/* Eye Radius */}
      <Form.Group className="mb-3" controlId="eyeRadius">
        <Form.Label>Eye Radius:</Form.Label>
        <Form.Range
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
        <Form.Text>{formData.eyeRadius}px</Form.Text>
      </Form.Group>

      {/* File Name */}
      <Form.Group className="mb-3" controlId="fileName">
        <Form.Label>File Name:</Form.Label>
        <Form.Control
          type="text"
          name="fileName"
          value={formData.fileName}
          onChange={handleInputChange}
        />
      </Form.Group>

      {/* Submit Button */}
      <div className="text-center">
        <Button type="button" variant="primary">
          Generate QR Code
        </Button>
      </div>
    </Form>
  );
};

export default form