import { APP_VERSION, CODE_UPDATE } from "@/utils/constant";

const FooterGlobal = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 h-full w-full">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 ITSC Division. All rights reserved.</p>
        <small>
          {APP_VERSION} - {CODE_UPDATE}
        </small>
      </div>
    </footer>
  );
};

export default FooterGlobal;
