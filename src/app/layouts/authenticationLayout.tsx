import { Col, Row } from "antd";
import React from "react";
import { Outlet } from "react-router";

const AuthenticationLayout: React.FC = () => (
  <Row className="h-screen">
    <Col xs={24} md={10} order={1} className="md:order-1">
      <div className="bg-second-primary! flex flex-col gap-4 justify-center items-center md:h-screen">
        <img
          src="/images/logo.svg"
          className="w-32 md:w-80 mb-4 md:mb-10"
          alt=""
          title="Logo"
          style={{
            filter: "brightness(0) invert(1)",
          }}
        />
        <p className="text-white text-lg md:text-3xl text-center px-4">
          شراكة موثوقة... لأثر مستدام.
        </p>
      </div>
    </Col>
    <Col
      xs={24}
      md={14}
      order={2}
      className="md:order-2 h-screen flex! flex-col! justify-center! px-4 md:px-8 bg-gray-200 overflow-auto!"
    >
      <div className="bg-white px-5 py-3 md:px-5 md:py-5 rounded-lg shadow-lg w-full md:w-3/4">
        <img
          src="/images/form-logo.svg"
          className="w-32 md:w-40 mb-3 md:mb-3 mx-auto"
          alt=""
          title="Logo"
        />
        <Outlet />
      </div>

      <span className="text-center text-gray-text text-xs sm:text-xs md:text-sm block mt-4 md:mt-0 absolute bottom-2 md:bottom-4">
        منصة الوقف النامي هي أحد منتجات شركة فَرادة .. جميع الحقوق محفوظة لموقع
        الوقف النامي © 2025
      </span>
    </Col>
  </Row>
);

export default AuthenticationLayout;
