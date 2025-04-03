import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { ImSpinner6 } from "react-icons/im";
import { Link } from "react-router";
const BusinessDataShow = ({ category }) => {
  const [businessData, setBusinessData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (category) {
      setLoading(true);
      axios
        .get(`http://localhost:4000/business/${category}`)
        .then((res) => {
          setBusinessData(res?.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      setLoading(true);
      axios
        .get(`http://localhost:4000/business`)
        .then((res) => {
          setBusinessData(res?.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [category]);
  if (loading) {
    return <div className="flex justify-center h-screen">
      <ImSpinner6 className="animate-spin text-4xl text-center mt-20" />
      </div>
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-16">

        {businessData.map((model) => (
          <Link
          to={`/Entrepreneur/${model._id}`}
          state={{model}}
            className="w-full h-fit bg-gray-50 border border-gray-300 rounded-lg shadow"
            key={model._id}
          >
            <div className="flex h-[200px] w-full items-center justify-center outline-none">
              <img
                className="rounded-t-lg mt-1 w-fit h-full object-cover"
                src={model?.imageUrl }
                alt=""
              />
            </div>
            <div className="p-5">
              <div href="#">
                <h5 className="mb-2 text-2xl tracking-tight text-gray-900 ">
                  {model?.title}
                </h5>
              </div>
              <p className="mb-3 font-normal text-gray-500 line-clamp-3">
                {model?.description}
              </p>
              <Link
              to={`/Entrepreneur/${model._id}`}
              state={{model}}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Read more
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

BusinessDataShow.propTypes = {
  category: PropTypes.string.isRequired,
};

export default BusinessDataShow;
