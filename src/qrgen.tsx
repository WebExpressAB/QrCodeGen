import React, { useRef } from "react";
import { QRCode } from "react-qrcode-logo";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

interface QRGenProps {
    url: string;
    size?: number;
    logoImage?: string;
    logoHeight?: number;
    logoWidth?: number;
    logoOpacity?: number;
    qrStyle?: "dots" | "squares" | "fluid";
    eyeRadius?: number;
    fileName?: string;
    bgColor?: string;
    fgColor?: string;
}

export const QRGen: React.FC<QRGenProps> = ({
    url,
    size,
    logoImage,
    logoHeight,
    logoWidth,
    logoOpacity,
    qrStyle,
    eyeRadius,
    fileName,
    bgColor,
    fgColor,
}) => {
    const qrRef = useRef<QRCode>(null);

    const downloadCode = () => {
        if (qrRef.current) {
            qrRef.current.download("png", fileName || "qr_code");
        }
    };

    return (
     <>
     <div className="mt-1">
            <QRCode
                ref={qrRef} // Attach the ref to access the QRCode instance
                value={url}
                size={size}
                logoImage={logoImage}
                logoHeight={logoHeight}
                logoWidth={logoWidth}
                logoOpacity={logoOpacity}
                enableCORS={true}
                qrStyle={qrStyle}
                eyeRadius={eyeRadius}
                bgColor={bgColor}
                fgColor={fgColor}
            />
<p>
                <Button className="btn btn-primary mt-4" onClick={downloadCode}>
                    Download QR Code
                </Button>
                </p>
                </div>
        </>
    );
};
