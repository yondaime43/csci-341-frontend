import { Routes, Route } from "react-router-dom";

import Nav from "./components/nav/nav";
import Doctors from "./components/doctors/doctors";
import Records from "./components/records/records";
import PublicServants from "./publicServants/publicServants";
import Diseases from "./components/diseases/diseases";

function App() {
    return (
        <div className="App">
            <Nav />
            <Routes>
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/" element={<Doctors />} />
                <Route path="/records" element={<Records />} />
                <Route path="/public-servants" element={<PublicServants />} />
                <Route path="/diseases" element={<Diseases />} />
            </Routes>
        </div>
    );
}

export default App;
