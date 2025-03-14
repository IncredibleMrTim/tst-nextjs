import Image from 'next/image';

const Home = () => {
  return (
    <div>
      <Image
        src="/images/tstBanner.png"
        alt="TST Banner"
        width={1920}
        height={1080}
      />
    </div>
  );
};

export default Home;
