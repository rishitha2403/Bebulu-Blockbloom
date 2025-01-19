# Blockbloom DAPP
Final Blockbloom DApp
This HealthRecord DApp provides decentralisation solution for managing and updating patients health record securely and trasparently. 
Patient can control who can access his health record by giving permission or revoking permission for them by adding their adderesses in the given space.Health records are stored on the blockchain, making them tamper-proof and immutable.Unauthorized access is prevented by implementing strict access control mechanisms.
All actions like granting permission or revorking permission are stored in blockchain.(Patients do not need to rely on a centralized entity to secure or manage their data. Trust is shifted to the blockchain.)
Decentralisation is achieved:Blockchain as a backbone.
Immutable healthrecords(Healthrecords stored in blockchain cannot be altered or removed without proper authentication.)
Smart contract logic(onlyOwner modifier: Restricts certain actions (e.g: updating records) to the contract owner.hasAccess modifier: Ensures only authorized addresses can view or modify patient data.)
Updating Recoreds(The contract owner (e.g: a hospital admin) can update a patient's health record using the updateHealthRecord function. The updated data is securely stored on the blockchain.)
Granting Access(Patients can grant access to their records by calling the grantAccess function, specifying the address of the healthcare provider.)
Revoking Address(If a patient no longer wishes to share their data, they can revoke access using the revokeAccess function.)
Veiwing records(Authorized entities can view the patient's health record using the viewHealthRecord function. The contract ensures that only authorized addresses can access this function.)
Checking access(The checkAccess function allows patients or providers to verify if access has been granted.)
