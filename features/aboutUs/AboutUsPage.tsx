const AboutUsPage = () => {
  return (
    <div className="md:mx-10">
      {/* body */}

      <div className="flex flex-row md:flex-col">
        {/* first slide */}
        <div className="mt-15 flex items-center justify-between">
          {/* image */}

          <img
            src="/images/dummbles10.jpeg"
            className="hidden w-50 rounded-xl object-cover object-left shadow-[0_0_15px] shadow-[#FEFEFE] md:block md:h-170 md:w-400 md:rounded-[65px]"
          />

          {/* text */}

          <div className="flex flex-col gap-15 md:ml-20">
            <div className="flex flex-col gap-10">
              <div className="text-primary text-4xl">OUR MESSION</div>
              <div className="flex flex-col gap-15">
                <div className="text-lg">
                  Founded in 2024,
                  <span className="text-secondary"> ZEKA SPORTS </span>
                  started with a single goal: to provide high-quality equipment
                  to athletes who are passionate about their craft. We believe
                  that the right gear shouldn't just fit you; it should inspire
                  you.
                </div>

                <div className="flex gap-10">
                  <div className="border-primary flex flex-col gap-2 border-l-2 p-2">
                    <div className="text-primary">Durability</div>
                    <div className="text-[12px]">
                      Built to last the toughest training sessions.
                    </div>
                  </div>

                  <div className="border-primary flex flex-col gap-2 border-l-2 p-2">
                    <div className="text-primary">Innovation</div>
                    <div className="text-[12px]">
                      Constantly refining materials and design.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutUsPage;
