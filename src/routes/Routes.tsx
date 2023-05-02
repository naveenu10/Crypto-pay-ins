import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "../components/loader/Loader";
const About = lazy(() => import("../pages/About"));
const Wallet = lazy(() => import("../pages/Wallet"));
const QrScan = lazy(() => import("../pages/QrScan"));
const QrCopy = lazy(() => import("../pages/QrScan/QrCopy"));

function App() {
    return (
        <Suspense fallback={<Loader />}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Wallet />} />
                    <Route path="/QrScan" element={<QrScan />} />
                    <Route path="/QrScan/Copy" element={<QrCopy />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}

export default App;