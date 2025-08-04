import { useEffect, useState } from 'react';
import { getDoctorCount } from '../../services/DoctorService';

const DoctorCount = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const total = await getDoctorCount();
        setCount(total);
      } catch (error) {
        console.error("Error fetching doctor count", error);
      }
    };
    fetchCount();
  }, []);

  return (
    <div>Total Doctors: {count}</div>
  );
};
export default DoctorCount;