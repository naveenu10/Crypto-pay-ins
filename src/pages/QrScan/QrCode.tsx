import QRCode from 'qrcode.react';
import React from 'react';

const DummyQRCode: React.FC = () => {
    const dummyData = 'https://example.com'; // Replace with your dummy data

    return (
        <div>
            <QRCode value={dummyData} />
        </div>
    );
};

export default DummyQRCode;