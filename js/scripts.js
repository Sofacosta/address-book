// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = { }; 
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact; //important line
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.address = {};
  }

  
  Contact.prototype.fullName = function() {
    return this.firstName + " " + this.lastName;
  }
  
  function Address(physical, email) {
    this.physical = physical;
    this.email = email;
  }
  
// User Interface Logic ---------
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

$(document).ready(function() {
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedAddress = $("input#address").val();
    const inputtedEmail = $("input#email").val();
    let newAddress = new Address(inputtedAddress, inputtedEmail);
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
    newContact.address = newAddress
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);

    function showContact(contactId) {
      const contact = addressBook.findContact(contactId);
      $("#show-contact").show();
      $(".first-name").html(contact.firstName);
      $(".last-name").html(contact.lastName);
      $(".phone-number").html(contact.phoneNumber);
      $(".address").html(contact.address.physical);
      $(".email").html(contact.address.email);
      let buttons = $("#buttons");
      buttons.empty();
      buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
    }
  });
});

