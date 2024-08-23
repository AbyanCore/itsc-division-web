import { APP_VERSION } from "@/utils/constant";

const FooterGlobal = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 ITSC Division. All rights reserved.</p>
        <a>{APP_VERSION}</a>
      </div>
    </footer>
  );
};

export default FooterGlobal;
