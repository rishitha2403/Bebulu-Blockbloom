import { useState } from 'react';
import { Contract, BrowserProvider } from 'ethers';
import { abi, contractAddress } from './HealthRecord.json';

function App() {
  const [patientAddress, setPatientAddress] = useState(0);
  const [healthRecord, setHealthRecord] = useState({
    patientName: "",
    medicalHistory: "",
    prescriptions: "",
    vaccinations: "",
  });
  const [output, setOutput] = useState("");
  const [accessAddress, setAccessAddress] = useState("");
  const [accessStatus, setAccessStatus] = useState("");

  const provider = new BrowserProvider(window.ethereum);

  const connectMetaMask = async () => {
    try {
      const signer = await provider.getSigner();
      alert(`Connected to MetaMask with address: ${signer.address}`);
    } catch (error) {
      alert(`Error connecting to MetaMask: ${error.message}`);
    }
  };

  const updateHealthRecord = async () => {
    try {
      const signer = await provider.getSigner();
      const instance = new Contract(contractAddress, abi, signer);

      const trx = await instance.updateHealthRecord(
        patientAddress,
        healthRecord.patientName,
        healthRecord.medicalHistory,
        healthRecord.prescriptions,
        healthRecord.vaccinations
      );
      console.log('Transaction Hash: ', trx.hash);
      alert('Health record updated successfully!');
    } catch (error) {
      alert(`Error updating health record: ${error.message}`);
    }
  };

  const viewHealthRecord = async () => {
    try {
      const signer = await provider.getSigner();
      const instance = new Contract(contractAddress, abi, signer);

      const result = await instance.viewHealthRecord(patientAddress);
      const lastUpdated = Number(result[4]);
      setOutput(
        `Patient Name: ${result[0]}, Medical History: ${result[1]}, Prescriptions: ${result[2]}, Vaccinations: ${result[3]}, Last Updated: ${new Date(lastUpdated * 1000).toLocaleString()}`
      );
    } catch (error) {
      alert(`Error viewing health record: ${error.message}`);
    }
  };

  const grantAccess = async () => {
    try {
      const signer = await provider.getSigner();
      const instance = new Contract(contractAddress, abi, signer);

      const trx = await instance.grantAccess(accessAddress);
      console.log('Transaction Hash: ', trx.hash);
      alert('Access granted successfully!');
    } catch (error) {
      alert(`Error granting access: ${error.message}`);
    }
  };

  const revokeAccess = async () => {
    try {
      const signer = await provider.getSigner();
      const instance = new Contract(contractAddress, abi, signer);

      const trx = await instance.revokeAccess(accessAddress);
      console.log('Transaction Hash: ', trx.hash);
      alert('Access revoked successfully!');
    } catch (error) {
      alert(`Error revoking access: ${error.message}`);
    }
  };

  const checkAccess = async () => {
    try {
      const signer = await provider.getSigner();
      const instance = new Contract(contractAddress, abi, signer);

      const result = await instance.checkAccess(patientAddress, accessAddress);
      setAccessStatus(result ? "Access Granted" : "Access Denied");
    } catch (error) {
      alert(`Error checking access: ${error.message}`);
    }
  };

  return (
    <>
      <h1>Health Record DApp</h1>
      <button onClick={connectMetaMask}>Connect to MetaMask</button>

      <div>
        <h2>Update Health Record</h2>
        <label>Patient Address: </label>
        <input
          type="text"
          value={patientAddress}
          onChange={(e) => setPatientAddress(e.target.value)}
        />
        <br />
        <label>Patient Name: </label>
        <input
          type="text"
          value={healthRecord.patientName}
          onChange={(e) =>
            setHealthRecord({ ...healthRecord, patientName: e.target.value })
          }
        />
        <br />
        <label>Medical History: </label>
        <input
          type="text"
          value={healthRecord.medicalHistory}
          onChange={(e) =>
            setHealthRecord({ ...healthRecord, medicalHistory: e.target.value })
          }
        />
        <br />
        <label>Prescriptions: </label>
        <input
          type="text"
          value={healthRecord.prescriptions}
          onChange={(e) =>
            setHealthRecord({ ...healthRecord, prescriptions: e.target.value })
          }
        />
        <br />
        <label>Vaccinations: </label>
        <input
          type="text"
          value={healthRecord.vaccinations}
          onChange={(e) =>
            setHealthRecord({ ...healthRecord, vaccinations: e.target.value })
          }
        />
        <br />
        <button onClick={updateHealthRecord}>Update Record</button>
      </div>

      <div>
        <h2>View Health Record</h2>
        <label>Patient Address: </label>
        <input
          type="text"
          value={patientAddress}
          onChange={(e) => setPatientAddress(e.target.value)}
        />
        <button onClick={viewHealthRecord}>View Record</button>
        <p>{output}</p>
      </div>

      <div>
        <h2>Manage Access</h2>
        <label>Healthcare Provider Address: </label>
        <input
          type="text"
          value={accessAddress}
          onChange={(e) => setAccessAddress(e.target.value)}
        />
        <button onClick={grantAccess}>Grant Access</button>
        <button onClick={revokeAccess}>Revoke Access</button>
        <button onClick={checkAccess}>Check Access</button>
        <p>{accessStatus}</p>
      </div>
    </>
  );
}

export default App;
