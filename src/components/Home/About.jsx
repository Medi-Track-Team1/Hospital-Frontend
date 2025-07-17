import React from "react";
import { TestTube, Stethoscope, Heart, Play } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <TestTube className="h-6 w-6 text-blue-600" />,
      title: "Advanced Laboratory Services",
      description:
        "State-of-the-art diagnostic facilities with cutting-edge technology",
    },
    {
      icon: <Stethoscope className="h-6 w-6 text-blue-600" />,
      title: "Expert Medical Care",
      description:
        "Comprehensive healthcare solutions delivered by experienced professionals",
    },
    {
      icon: <Heart className="h-6 w-6 text-blue-600" />,
      title: "Compassionate Treatment",
      description:
        "Patient-centered approach with personalized care and attention",
    },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 scroll-mt-[130px]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Medical team"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transform hover:scale-110 transition-all duration-300 pulse-animation">
                  <Play className="h-8 w-8 ml-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                About Us
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                At Medilab, we are dedicated to providing exceptional healthcare
                services with a focus on innovation, compassion, and excellence.
                Our state-of-the-art facilities and experienced medical
                professionals work together to ensure the best possible outcomes
                for our patients.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex-shrink-0 bg-blue-100 p-2 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h5 className="text-lg font-semibold text-gray-800 mb-2">
                      {feature.title}
                    </h5>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
