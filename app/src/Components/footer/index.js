import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2024 Sua Empresa. Todos os direitos reservados.</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    // position: "fixed",
    bottom: "0",
    width: "100%",
    position: "absolute",
  },
};

export default Footer;
