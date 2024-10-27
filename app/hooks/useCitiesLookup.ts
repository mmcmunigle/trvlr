import { useState } from 'react';
import axios from 'axios';
import useCityOptionStore from '../state-management/city-options-store';

const useCitiesLookup = () => {
  const { cities, setCities } = useCityOptionStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lookupCities = async (country: string) => {
    setLoading(true);
    setError(null);

    try {
      setCities([]);
      await axios
        .post('https://countriesnow.space/api/v0.1/countries/cities', {
          country: country.toLowerCase(),
        })
        .then((resp) => {
          setCities(resp.data.data);
        });
    } catch (err) {
      setError('Failed to get cities');
    } finally {
      setLoading(false);
    }
  };

  return {
    cities,
    lookupCities,
    loading,
    error,
  };
};

export default useCitiesLookup;
