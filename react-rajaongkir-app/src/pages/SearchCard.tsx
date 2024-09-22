import React, { useState, useEffect } from 'react';
import { fetchProvinces, fetchCity, fetchCost } from '../api/apiService';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"

type FormValues = {
    originProvince: string
    originCity: string
    destinationProvince: string
    destinationCity: string
    weight: number
    courier: string
}

const SearchCard: React.FC = () => {
    const [results, setResults] = useState<any[]>([]);
    const [provincesOrigin, setProvincesOrigin] = useState<any[]>([]);
    const [citiesOrigin, setCitiesOrigin] = useState<any[]>([]);
    const [provincesDestination, setProvincesDestination] = useState<any[]>([]);
    const [citiesDestination, setCitiesDestination] = useState<any[]>([]);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>()
    const navigate = useNavigate();

    useEffect(() => {
        const tokens = localStorage.getItem('authToken');
        console.log(tokens);

        if (!tokens) {
            navigate('/login', { state: { message: 'Please login first' } });
        }
    }, [])

    useEffect(() => {
        const fetchProvinceData = async () => {
            const data = await fetchProvinces();
            setProvincesOrigin(data);
            setProvincesDestination(data);
        };
        fetchProvinceData();
    }, []);

    const originProvince = watch('originProvince');
    const destinationProvince = watch('destinationProvince');

    useEffect(() => {
        if (originProvince) {
            handleProvinceOriginChange(originProvince);
        }
    }, [originProvince]);

    useEffect(() => {
        if (destinationProvince) {
            handleProvinceDestinationChange(destinationProvince);
        }
    }, [destinationProvince]);
    

    const handleProvinceOriginChange = async (provinceId: string | null) => {
        if (provinceId) {
            const cityData = await fetchCity(provinceId);
            setCitiesOrigin(cityData);
        }
    };

    const handleProvinceDestinationChange = async (provinceId: string | null) => {
        if (provinceId) {
            const cityData = await fetchCity(provinceId);
            setCitiesDestination(cityData);
        }
    };

    const handleSearch = async (e: FormValues) => {
        console.log('Searching for shipping costs...');

            try {
                const costData = await fetchCost({ origin: e.originCity, destination: e.destinationCity, weight: e.weight, courier: e.courier });
                console.log('Cost data:', costData);
                setResults(costData);
                setShowAlert(true);
            } catch (error) {
                console.error('Error fetching cost:', error);
            }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    }

    return (
        <div>
            <button className="btn-logout" onClick={logout}> Logout </button>
            <div className="search-card">
                <h2>Search Shipping Costs</h2>
                <form onSubmit={handleSubmit(handleSearch)}>
                    <div className="form-group">
                        <label>Select Origin Province</label>
                        <select
                            {...register("originProvince", { required: 'Origin Province is required' })}>
                            <option value="">-- Select Province --</option>
                            {provincesOrigin.map((province) => (
                                <option key={province.province_id} value={province.province_id}>
                                    {province.province}
                                </option>
                            ))}
                        </select>
                        {errors?.originProvince && <p style={{ color: 'red' }}>{errors.originProvince.message}</p>}
                    </div>

                    <div className="form-group">
                        <label>Select Origin City</label>
                        <select
                            {...register("originCity", { required: 'Origin City is required' })}>
                            <option value="">-- Select City --</option>
                            {citiesOrigin.map((city) => (
                                <option key={city.city_id} value={city.city_id}>
                                    {city.city_name}
                                </option>
                            ))}
                        </select>
                        {errors?.originCity && <p style={{ color: 'red' }}>{errors.originCity.message}</p>}
                    </div>

                    <div className="form-group">
                        <label>Select Destination Province</label>
                        <select
                            {...register("destinationProvince", { required: 'Destination Province is required' })}>
                            <option value="">-- Select Province --</option>
                            {provincesDestination.map((province) => (
                                <option key={province.province_id} value={province.province_id}>
                                    {province.province}
                                </option>
                            ))}
                        </select>
                        {errors?.destinationProvince && <p style={{ color: 'red' }}>{errors.destinationProvince.message}</p>}
                    </div>

                    <div className="form-group">
                        <label>Select Destination City</label>
                        <select {...register("destinationCity", { required: 'Destination City is required' })}>
                            <option value="">-- Select City --</option>
                            {citiesDestination.map((city) => (
                                <option key={city.city_id} value={city.city_id}>
                                    {city.city_name}
                                </option>
                            ))}
                        </select>
                        {errors?.destinationCity && <p style={{ color: 'red' }}>{errors.destinationCity.message}</p>}
                    </div>

                    <div className="form-group">
                        <label>Select Courier</label>
                        <select {...register("courier", { required: 'Courier is required' })}>
                            <option value="">-- Select Courier --</option>
                            <option value="jne">JNE</option>
                            <option value="pos">POS</option>
                            <option value="tiki">TIKI</option>
                        </select>
                        {errors?.courier && <p style={{ color: 'red' }}>{errors.courier.message}</p>}
                    </div>

                    <div className="form-group">
                        <label>Weight (grams)</label>
                        <input
                            type="number"
                            {...register("weight", { required: 'Weight is required' })} />
                        {errors?.weight && <p style={{ color: 'red' }}>{errors.weight.message}</p>}
                    </div>

                    <button className="btn" type='submit'>
                        Search
                    </button>
                </form>

                {showAlert && results.length > 0 && (
                    <div className="alert-box">
                        <h3>Shipping Costs Results</h3>
                        <div className="results">
                            {results[0].costs.map((cost: any, index: any) => (
                                <div key={index} className="result-item">
                                    <h4>{cost.service} - {cost.description}</h4>
                                    <p>Cost: Rp {cost.cost[0].value}</p>
                                    <p>Estimated Delivery: {cost.cost[0].etd} days</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div></div>
    );
};

export default SearchCard;
