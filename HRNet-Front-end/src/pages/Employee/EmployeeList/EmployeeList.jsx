import EmployeeTable from '../../../components/EmployeeTable/EmployeeTable';

// les autres fonctions
// OK - une barre de recherche
// OK   - quand on cherche dedans, la liste se réduit

// - un affichage d'entrées (10, 25, 50, 100 )
//    - quand on choisit 20, entrées, il affiche jusqu'à 20 entres
//    - et crés des pages en fonction du restant
// - un accès à différentes pages
//  OK   - avec un numéro de page,
//  OK  - un bouton next et
//    - un affichage de pages

// OK - un lien vers Home (navbar)

// OK - un bouton sur chaque colonne qui affiche un ordre ou un désordre

const EmployeeList = () => {
  const savedData = localStorage.getItem('employees');
  if (savedData) {
    const employeeFromLocalStorage = JSON.parse(savedData);
    console.log('venant du localestorage', employeeFromLocalStorage);
  }

  return (
    <div>
      <h2>Current Employees</h2>
      <EmployeeTable data={JSON.parse(localStorage.getItem('employees'))} />
    </div>
  );
};

export default EmployeeList;
