import React from "react";
import { Image, Text } from "@chakra-ui/react";
import { Link } from "@remix-run/react";

const FooterStyle = {
  position: "fixed",
  right: 0,
  bottom: 50,
  width: "10%",
  justifyContent: "flex-end",
  alignItems: "end",
  padding: "10px",
};

const Footer = () => {
  return (
    <div style={FooterStyle}>
      <Link to="https://www.instagram.com/enmove_event?igsh=MThtY3k1MnZrN3Jkag%3D%3D&utm_source=qr">
        <Image
          boxSize="80px"
          src="/images/Instagram.png"
          alt="Instagram"
          marginLeft={6}
        ></Image>
        <Text>enmove_event</Text>
      </Link>
    </div>
  );
};

export default Footer;
