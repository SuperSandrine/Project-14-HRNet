import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const RootLayout = ({ children }) => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>{children} </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
