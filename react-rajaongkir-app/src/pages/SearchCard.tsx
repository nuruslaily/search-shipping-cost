import React, { useState, useEffect } from 'react';
import { fetchProvinces, fetchCity, fetchCost } from '../api/apiService';
import '../App.css'; 
import { useNavigate } from 'react-router-dom';

const SearchCard: React.FC = () => {
    const [origin, setOrigin] = useState<string | null>(null);
    const [destination, setDestination] = useState<string | null>(null);
    const [weight, setWeight] = useState<number>(0);
    const [courier, setCourier] = useState<string>('');
    const [results, setResults] = useState<any[]>([]);
    const [provinces, setProvinces] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const tokens = localStorage.getItem('authToken');
        console.log(tokens);
        
        if (!tokens) {
            navigate('/login', {state : {message: 'Please login first'}});
        } 
    },[])

    useEffect(() => {
        const fetchProvinceData = async () => {
            const data = await fetchProvinces();
            setProvinces(data);
        };
        fetchProvinceData();
    }, []);

    const handleProvinceChange = async (provinceId: string | null) => {
        if (provinceId) {
            const cityData = await fetchCity(provinceId);
            setCities(cityData);
        }
    };

    const handleSearch = async () => {
        console.log('Searching for shipping costs...');
        
        if (origin && destination && weight > 0) {
            try {
                const costData = await fetchCost({ origin, destination, weight, courier });
                console.log('Cost data:', costData);
                setResults(costData);
                setShowAlert(true); 
            } catch (error) {
                console.error('Error fetching cost:', error);
            }
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

            <div className="form-group">
                <label>Select Origin Province</label>
                <select onChange={(e) => handleProvinceChange(e.target.value)}>
                    <option value="">-- Select Province --</option>
                    {provinces.map((province) => (
                        <option key={province.province_id} value={province.province_id}>
                            {province.province}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Select Origin City</label>
                <select onChange={(e) => setOrigin(e.target.value)}>
                    <option value="">-- Select City --</option>
                    {cities.map((city) => (
                        <option key={city.city_id} value={city.city_id}>
                            {city.city_name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Select Destination City</label>
                <select onChange={(e) => setDestination(e.target.value)}>
                    <option value="">-- Select City --</option>
                    {cities.map((city) => (
                        <option key={city.city_id} value={city.city_id}>
                            {city.city_name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Select Courier</label>
                <select onChange={(e) => setCourier(e.target.value)}>
                    <option value="">-- Select Courier --</option>
                    <option value="jne">JNE</option>
                    <option value="pos">POS</option>
                    <option value="tiki">TIKI</option>
                </select>
            </div>

            <div className="form-group">
                <label>Weight (grams)</label>
                <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))} />
            </div>

            <button className="btn" onClick={handleSearch}>
                Search
            </button>

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
