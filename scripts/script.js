// Arrays to store instances
const members = [];
const gymClasses = [
{ name: "Trial Class", price: 0 }, 
{ name: "Yoga", price: 10 }, 
{ name: "CrossFit", price: 20 }, 
{ name: "Pilates", price: 15 }
];
const membershipFees = [30, 45, 50]; // Example fees for Task 1

// Task 1: Calculate Total Membership Fees
function calculateTotalFee(feeArray){
    return feeArray.reduce((total, fee) => total + fee, 0);
};


// Task 2: Filter Paid Gym Classes
function filterPaidClasses(classes){
    return classes.filter(gymClass => gymClass.price > 0);
}

// Task 3: Gym Member Class
class GymMember{
    constructor(name, membershipType){
        this.name = name;
        this.membershipType = membershipType;
    }
    displayInfo(){
        return `Member Name: ${this.name} | Membership Type: ${this.membershipType}`;
    }
}

// Task 4: Personal Training Client Class
class PersonalTrainerClient extends GymMember{
    constructor(name, membershipType, trainerName){
        super(name, membershipType);
        this.trainerName = trainerName;
    }
    displayInfo(){
        return `${super.displayInfo}, Trainer: ${this.trainerName}`;
    }
}

// Task 5: Gym Class Constructor
function GymClass(name, price){
    this.name = name;
    this.price = price;
}

document.addEventListener('DOMContentLoaded', () => {
    const displayArrayList = (array, elementId) =>{
        const listElement = document.getElementById(elementId);
        listElement.innerHTML = '';
        array.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item.displayInfo ? item.displayInfo() : `${item.name}, Price: ${item.price}`;
            listElement.appendChild(listItem);
        })
    };

    document.getElementById('total-membership-fee').innerHTML = `<h4>Total Membership Fees: $${calculateTotalFee(membershipFees)}</h4>`;

    displayArrayList(filterPaidClasses(gymClasses), 'gym-classes');

    document.getElementById('create-member-btn').onclick = () => {
        const name = document.getElementById('member-name-input').value;
        const type = document.getElementById('member-type-select').value;
        const trainerName = document.getElementById('trainer-name-input').value;

        let member;
        if(trainerName){
            member = new PersonalTrainerClient(name, type, trainerName);
        }else{
            member = new GymMember(name, type);
        }

        members.push(member);
        displayArrayList(members, 'all-member-list');
    };

    document.getElementById('create-class-btn').onclick = () =>{
       const name =  document.getElementById('class-name-input').value;
       const price = parseFloat(document.getElementById('class-price-input').value);
       const gymClass = new GymClass(name, price);

       gymClasses.push(gymClass);

       displayArrayList(filterPaidClasses(gymClasses), 'gym-classes');
    }

})
