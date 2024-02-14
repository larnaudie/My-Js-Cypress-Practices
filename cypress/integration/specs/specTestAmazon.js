"use stric"
/// <reference types="Cypress" />
/*
TIPS:

//PARA EJECUTAR LA INTERFAZ USAMOS:
npm run cypress:open
  //ASEGURARSE DE TENER:
  {
  "devDependencies": {
    "cypress": "^13.6.4"
  },
  "scripts": {
    "cypress:open": "cypress open"
  }
}

Luego correr el codigo en terminal para abrir interfaz
npm run cypress:open
//////////////////////////////////    EJECUTAR CYPRESS    ///////////////////////////////////////////
//Para ejecutar todos los archivos spec en la carpeta package.json
./node_modules/.bin/cypress run

//Para ejecutar un spec file especifico, despues del fun colocar el nombre del spec que quiero
npx cypress run --spec “cypress/integration/my-spec.js”

//SI EJECUTAMOS ASI CYPRESS SE EJECUTARA INVISIBLE

//SI queremos que se ejecute visible la interfaz
./node_modules/.bin/cypress run --header
-
//Si queremos ejecutarlo en Electron:
$ cypress run --header
//Si queremos ejecutarlo en chrome
$ cypress run --browser chrome

-//////////////////////      AUTO-SUGERENCIA CYPRESS    ////////////////////////////////////////////
/// <reference types="Cypress" />
Esto se debe colocar arriba del todo en cypress y activa la sugerencia automatica

//////////////////////////////    cARPETAS Y SUS FUNCIONES   ////////////////////////////////////////////
//Carpeta fixtures
Aca va a venir todos los datos que sean leidos de externos, como API JSONS, EXCEL
Podemos invocar los datos almacenados en fixtures con el comando: fixtures
//Carpeta integration
Ahi vamos a colocar todos nuestors spec files.
//Carpeta Support
Podemos escribir nuestros comandos especificos para usarlos luego.
//Cypress.config.js
Este archivo brinda acceso globalmente a todos el framework
Dentro de ese Archivo, podemos escribir los comandos que estan
dentro de la interfaz de cypress-->Project Settings
Si queremos cambiar la carpeta donde se guardan las screenshots
llamamos a esa screenshotFolder y le reasignamos un path.

/////////////////////////////////////    SELECTORES   /////////////////////////////////////////////////
Click derecho sobre la web xra abrir consola->Inspect->Element
Seleccionando la flechita arriba a la izq. de la consola.

CYPRESS ES COMPATIBLE SOLO CON CSS SELECTOR
Se puede importar XPAth
    CSS selectos se escriben 
    para id ->      #idname
        Si hay muchos id con el mismo nombre -> tagname#idname 
        // TAGNAME ES EL P, DIV, A, ETC...
    para clases ->  .classname
        Si hay muchas clases con el mismo nombre -> tagname.classname
          // TAGNAME ES EL P, DIV, A, ETC...
    para atributos -> tagname[attribute=value]
          //Atributos son: type, placeholder, los que estan en naranga en DOM.
          ej; input es tagname, type es attribute, "search" es value. -> input[type="search"];
    para movernos mediante tagnames, de padre a hijo
          //Debemos mirar el DOM como esta formado, si form tiene a input puedo hacer: form input
          //En xpath puedo hacer form/input
        
    para seleccionar elementos SOLO visibles
          //cy.get(".clasname:visible") -> sino tambien seleccinoa los ocultos

///////////////////////////////////////   Assersions   /////////////////////////////////////////////////////
https://docs.cypress.io/guides/references/assertions

----------------------------------------------SHOULD---------------------------------

https://docs.cypress.io/guides/references/assertions#Length
.should("have.length", 40);
     Verifica si deberia tener un largo de 40
.shoult(`exist`) or .should(`not.exist`)
    Verifica si un elemento existe en el DOM.

Verificar si un texto contiene una palabra:
Opcion 1)
  cy.get('#miElemento').should('contain', 'ejemplo');
Opcion 2)
  cy.get('#miElemento').invoke('text').then(texto => {
  expect(texto).to.include('ejemplo');
});

Verificar si un checkbox ha sido seleccionado correctamente
    //Selecting Google checkbox
    cy.get(`#p_89\/Google > span > a > div > label > i`).check().should(`be.checked`);

//////////////////////////////////////   ASYNCRONISMO   ///////////////////////////////////////////////////////////

CYPRESS ES ASYNCRONICO, si son comandos de cypress, todos los comandos llegaran al servidor a la misma vez
Las promesas no son mas que un paso, y devuelve 3 resultados.
Pending, resuloved, rejected -> La promesa puede estar pendiente, resuelta o rechazada

                         -METODO THEN-
Sirve para manejar asyncronicamente cypress, cuando una respusta
va a demorar o una accion tiene que ser hecha fuera del framework
debemos esperara a que la promesa se cumpla en then, y sino, catch
atrapa el error.

  cy.get('#miElemento').invoke('text').then(texto => {
  expect(texto).to.include('ejemplo');
});

Podemos tener muchos .then seguidos unos de otros.

Ejemplo:
Si queremos obtener el texto del logo de amazon, asi no se puede hacer;
    const logo = cy.get("#nav-logo-sprites");
    logo.text()

Debemos tratarlo como una promesa.
    cy.get("#nav-logo-sprites").then((logo)=>{
      El elemento obtenido del selector, se almacenara en el parametro logo.
    cy.log(logo.text());
    })

Si concatenamos un comando de cypress con otro, por ejemplo;
cy.get(".algo").type(".algoMas")
Lo resolverá internamente-
NO PODEMOS CONCATENAR CYPRESS COMAND CON JAVASCRIPT COMAND, PARA ESO HAY QUE USAR THEN.


///////////////////////////////////   METODOS    ////////////////////////////////////////////////////
https://docs.cypress.io/api/table-of-contents

-----------------------------METODO CLICK--------------------------------------------------
Luego de un cy.get, podemos hacer un .click()

Si este click esta dentro de un .each, tendremos que usar cy.wrap.

-----------------------METODO GET-----------------------------------------------------------------------------------
Nos traer el objeto de la pagina web.

----------------------  METODO WAIT-------------------------------------------------------------
Si queremos hacer que cypress espere un tiempo hay un metodo llamdo
cy.wait(1000) -> 1 segundo.

------------------------mMETODO EQ---------------------------------
Selecciona un elemento de un array escribiendo el numero de indice
Ej;
  cy.get("[data-asin]").find(".puis-card-container").eq(2).click();

----------------------METODO CONTAINS------------------------------
Sirve para verificar si contiene un texto y devuelve valor booleano 


----------------------METODO RETROCEDER----------------------------
Con esto puedo retroceder una pagina hacia atras
    cy.go(`back`); 
    
----------------------  METODO REFRESCAR F5-------------------------
Con esto puedo refrescar toda la pagina.
    cy.reload

---------------------- METODO INVOKE -------------------------------
Con este elemento puedo extraer el texto de un elemento
    .invoke(`text`)
    
-----------------------  METODO .EACH -------------------------------

Con este metodo puedo iterar en un array, el valor de iteracion
sera igual al valor de largo de mi array, si tengo 5 elementos en el array
el bloque .each{} se ejecutará 5 veces.

El metodo cuenta con 3 elementos $el, index, $list.
$el -> Es el elemento que recorre y lo guarda ahi por cada loop
index -> Será igual al valor del indice que se encuentra el loop
$list -> Es la lista total de elementos.

ESTRUCTURA DEL EACH;
.each(($el, index, $list) => {})

.each lo que hará sera: Tomar el elemento encontrado y lo alamcenara en $el
por ejemplo: 

cy.get("[data-asin]").find('h2.a-size-mini').each(($el, index, $list) => {})

Ahi, en h2.a-size-mini, tengo 24 elementos, sobre ellos es que va a iterar .each.
SI quisiera que busque un elemento cada vez que este adentro de ese elemento, podemos decirle

cy.get("[data-asin]").find('h2.a-size-mini').each(($el, index, $list) => {
  cy.wrap($el).find(`.elElemento`)
})

------------------------------ METODO INCLUDES -----------------------------------
INCLUDES es un metodo de Javascript.


------------------  METODO TEXTNO ES UN COMANDO DE CYPRESS--------------------------
Sirve para extraer el texto de un elemento, podemos guardarla en una variable para sarla.
AL NO SER COMANDO DE CYPRESS SE DEBE MANEJAR COMO PROMESA.

-------------------------------METODO INVOKE--------------------------------
Sirve para extraer el texto de un elemento.

  cy.get('#miElemento').invoke('text').then(texto => {
  expect(texto).to.include('ejemplo');
});

------------------------------METODO CHECK--------------------------------------
Debemos obtener el selector del checkbox y sobre el le aplicamos el metodo check()

    //Selecting Google checkbox
    cy.get(`#p_89\/Google > span > a > div > label > i`).check();

Cuando un elemtno esta siendo solapado por otro, podemos usar 
.check({force: true})

------------------------------METODO AS-------------------------------------------
En vez de guardar todo un selector con un const o let, podemos y DEBEMOS usar as,
luego para llamarlo lo arrobamos antes del nombre que le dimos



////////////////////////  JQUERY IN CYPRESS  ////////////////////////////////////////////

---------------------JQUERY METHOD: TEXT----------------------------------
TEXT es un metodo que esta dentro de Jquery en Cypress, soporta jquery metods, y text es un metodo de jquery.
No hay un metodo que grabe el texto en cypress.
JQueary es una herramienta de desarrollo disponible para manipular el DOM.

*/
//test suite
describe("My first test suite", () => {
  //test case
  it.skip("Visiting the website", () => {
      //test step
      cy.visit("https://www.amazon.com/");
    })

  it.skip("Login-IMPOSIBLE TO CHECK CODE", () => {
      //test step
      cy.visit("https://www.amazon.com/");
      cy.get("#nav-link-accountList > span > span").click()
      cy.get("#createAccountSubmit").click();
      cy.get("#ap_customer_name").type("Pablotest");
      cy.get("#ap_password").type("test2024");
      cy.get("#ap_password_check").type("test2024");
      cy.get("#ap_email").type("pablolarnaudiedrive2@gmail.com");
      cy.get("#continue").click();
  })

  it.skip(`Verifing code to log-in-ERRORS`, ()=>{
  /*con gmail
    cy.visit('https://mail.google.com')
    cy.get("#identifierId").type("pablolarnaudiedrive2@gmail.com")
    cy.get("#identifierNext > div > button > span").click();
    cy.get(".WpHeLc").click();
    setTimeout(()=>{
    cy.get("#identifierId").type("pablolarnaudiedrive2@gmail.com")
    cy.get("#identifierNext > div > button > span").click();
    cy.get(".WpHeLc").click();
    },4000);
    cy.get("#identifierId").type("pablolarnaudiedrive2@gmail.com")
    cy.get("#identifierNext > div > button > span").click();
    cy.get(".WpHeLc").click();
    cy.get("#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input").type("t108216Y");
    cy.get("#passwordNext > div > button > span").click();
    */
   /*con microsoft
       cy.visit("https://www.microsoft.com/es-uy/");
    cy.get("#meControl").click();

    /*cy.get("#i0116").type("eltito_sabe@hotmail.com");
    cy.get("#idSIButton9").click();
    cy.get("#i0118").type("melacomo");
    cy.get("#declineButton").click();*/
  })

  it.skip("Testing the search bar", ()=>{
    //Going into Amazon
    cy.visit("https://www.amazon.com/");
    //typing in the search bar google pixel 8
    cy.get("#twotabsearchtextbox").type("Google Pixel 8")
    //doing click on the search button
    cy.get('#nav-search-submit-button').click();
    //verifiaing that should have 31 items.
    cy.get("[data-asin]").should("have.length",31)
  })

  it.skip("Catching the Amazon logo", ()=>{
    //Going into Amazon
    cy.visit("https://www.amazon.com/");
    //Trying to get the Amazon logo. AND SAVING IT INTO A VARIABLE
    //This two lines, will trigger: logo is not a function, because cypress couldb't solve it without a promise
    //Cypress can't handle this get inside a variable.
    //const logo = cy.get("#nav-logo-sprites");
    //logo.text()

    cy.get("#nav-logo-sprites").then((logo)=>{
      //The element got from the selector, will be saved in logo parameter.
      //TEXT IS NOT A CYPRESS METHOD.
    cy.log(logo.text());
    })

  })

  it.skip("Example with rahulshetty about then promises",() => {
      cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
      cy.get(".search-keyword").type("ca");
      cy.wait(2000);
      //selenium get hit url in browser, cypress get acts like findElement of selenium
      cy.get(".product").should("have.length", 5);
      cy.get(".product:visible").should("have.length", 4);
      //Parent child chaining
      cy.get(".products").as("productLocator");
      cy.get("@productLocator").find(".product").should("have.length", 4);
      cy.get(":nth-child(3) > .product-action > button").click();
      cy.get("@productLocator")
        .find(".product")
        .eq(2)
        .contains("ADD TO CART")
        .click()
        .then(function () {
          console.log("sf");
        });
  
      cy.get("@productLocator")
        .find(".product")
        .each(($el, index, $list) => {
          const textVeg = $el.find("h4.product-name").text();
          if (textVeg.includes("Cashews")) {
            $el.find("button").click();
          }
        });
  
      //assert if logo text is correctly displayed
      cy.get(".brand").should("have.text", "GREENKART");
  
      //this is to print in logs
      cy.get(".brand").then(function (logoelement) {
        cy.log(logoelement.text());
      });

  })

  it.skip("Testing adding an item to a chart-ERRORS", ()=>{
    //Going into Amazon
    cy.visit("https://www.amazon.com/");
      //will made a refreash to solve the problem of catch a different search bar
      cy.reload();
      //will serch for the search bar
      cy.get('#nav-search');
      //typing in the search bar google pixel 8
       cy.get("#twotabsearchtextbox").type("Google Pixel 8")
      //doing click on the search button
      cy.get('#nav-search-submit-button').click();

    //verifiaing that should have 31 items.
    cy.wait(3000) //-> will wait for 3 seconds.
    cy.get("[data-asin]").should("have.length",31)

    //Selecting one item from this array
    cy.get("[data-asin]").find(".puis-card-container").eq(2).find(`.a-size-medium`).click();
    //Selector to be able to see all the options -> add to cart button will be available
    cy.get('#add-to-cart-button').click();
    //We expect that the cart has a number 1 as a final count.
    cy.get('#nav-cart-count').should(`contain`,`1`);

    //Verifying that the cart truly has the item added
    cy.get('#sw-gtc > .a-button-inner > .a-button-text').should(`exist`).click();

    //Accessing to the title's string to verify if contains google pixel 8 string.
    cy.get('.a-truncate-cut').invoke(`text`).should(`contain`, `Google Pixel`)
  })

  it.skip("Testing adding some items to a chart-ERRORS", ()=>{
        //Going into Amazon
        cy.visit("https://www.amazon.com/");
        //will made a refreash to solve the problem of catch a different search bar
        cy.reload();
        //will serch for the search bar
        cy.get('#nav-search');
        //typing in the search bar google pixel 8
        cy.get("#twotabsearchtextbox").type("Google Pixel 8 - ")
        //this avoid the error triggered bu the click method.
        cy.once('uncaught:exception', () => false);
        //doing click on the search button
        cy.get('#nav-search-submit-button').click();
      
      //verifiaing that should have 31 items inside attribute data-asin indie .s-main
      cy.wait(3000) //-> will wait for 3 seconds.
      
      //variates between 41 and 42
      //cy.get(".s-main-slot").find(`[data-asin]`).should("have.length",41)
      
      //Here I obtain 24 pieces of content, each should iterate by each element
      cy.get("[data-asin]").find('h2.a-size-mini').each(($el, index, $list) => {
        
        //Remember, this can't be handeld by cypress itself
        const textTitle = $el.text();
        //this directly won't work
        //cy.get($el).find(`a.a-link-normal`);
        //$el.text();

        //Veryfing in console the value of the $el
        cy.log(textTitle);
        //Adding some logic to select ONLY the items with the following string
        if(textTitle.includes(`Google Pixel 8`)){
            //this avoid the error triggered bu the click method.
            cy.once('uncaught:exception', () => false);
            //Applying the THEN method to handle the variable out of cypress.
            cy.get($el).find(`a.a-link-normal`).then((btn)=>{
            //this avoid the error triggered bu the click method.
            cy.once('uncaught:exception', () => false);
            //remember we need to wrap $el or btn parameter to do click on it,
            cy.wrap(btn).click();
            });
            //Adding items to a chart
            cy.get('#add-to-cart-button').click();
            //Finding green icon
            cy.get('#NATC_SMART_WAGON_CONF_MSG_SUCCESS > .a-box > .a-box-inner > .a-icon').should(`be.visible`);
            //Verifying also with the string
            cy.get('.a-size-medium-plus').should(`contain`, `Agregado al carrito`)
            //Going back to be able to repeat all the loop again.
            cy.go(`back`);
            //this avoid the error triggered bu the click method.
            cy.once('uncaught:exception', () => false);
            cy.wait(2000);
            cy.go(`back`);
            //Verifying that we are correcltly in the main menu
            cy.get('.s-no-outline > .a-row > .a-size-base').should(`be.visible`);
            //this avoid the error triggered bu the click method.
            cy.once('uncaught:exception', () => false);

          }else{
          cy.log(`There weren't matched strings, ${textTitle}`)
        }
      })
  })

  it.skip("Testing the UI of the items within the list", ()=>{
    cy.visit("https://www.amazon.com/");
    //we need refresh with F5 the webpage 'cuz the nav bar appears different sometimes
    cy.reload();
    //typing in the search bar google pixel 8
    cy.get("#twotabsearchtextbox").type("Google Pixel 8")
    //doing click on the search button
    cy.get('#nav-search-submit-button').click();
    //accessing to the content class
    cy.get(".sg-col-20-of-24:visible").should(`be.visible`);
    //veryfing if has 27 elements in the DOM.
    cy.get(".sg-col-20-of-24:visible").should(`have.length`, 27);
    //Trying to find an element inside the class
    cy.get(".sg-col-20-of-24:visible").find(`.s-image`).should(`be.visible`);
    //extracting the text displayed in the thirty item  within the list.
    cy.get(".sg-col-20-of-24:visible").eq(2).find(`.a-price-whole`).then((price)=>{
      cy.log(price.text());
    });
  })

  it.skip("Optimization of the last test case", ()=>{
    //When you are using too many time the same label, you can grab it with a new name with as 
    //the reserved label "as" works as a variable const, let, in the meaning that you can grab a value there.

    cy.visit("https://www.amazon.com/");
    //we need refresh with F5 the webpage 'cuz the nav bar appears different sometimes
    cy.reload();
    //typing in the search bar google pixel 8
    cy.get("#twotabsearchtextbox").type("Google Pixel 8")
    //doing click on the search button
    cy.get('#nav-search-submit-button').click();
    //Creating a new name for the selctor with AS word
    cy.get(".sg-col-20-of-24:visible").as(`allCelphones`)
    //accessing to the content class
    //We add an @ before to call the name of the selector.
    cy.get("@allCelphones").should(`be.visible`);
    //veryfing if has 27 elements in the DOM.
    cy.get("@allCelphones").should(`have.length`, 27);
    //Trying to find an element inside the class
    cy.get("@allCelphones").find(`.s-image:visible`).should(`be.visible`);
    //extracting the text displayed in the thirty item  within the list.
    cy.get("@allCelphones").eq(2).find(`.a-price-whole`).then((price)=>{
      cy.log(price.text());
    });
  })
  it("Testing checkboxes and Dropdowns",()=>{
    //When you are using too many time the same label, you can grab it with a new name with as 
    //the reserved label "as" works as a variable const, let, in the meaning that you can grab a value there.
    cy.visit("https://www.amazon.com/");
    //we need refresh with F5 the webpage 'cuz the nav bar appears different sometimes
    cy.reload();
    //typing in the search bar google pixel 8
    cy.get("#twotabsearchtextbox").type("Google Pixel 8")
    //doing click on the search button
    cy.get('#nav-search-submit-button').click();
    //Selecting Google checkbox
    cy.get('li[aria-label="Google"]').find('input[type="checkbox"]').check({force: true})
    //Selecting 128 GB checkbox
    cy.get(`li[aria-label="128 GB"]`).find('input[type="checkbox"]').check({force: true})
    
    //Going into a celphone that has other checkbox inside him
    cy.get(`puis-card-container:visible`).find(`h2.a-size-mini:visible`).should(`have.text`, `Google Pixel 7`).click();


    //We opened a dropdown menu
    //cy.get(`span[data-action="a-dropdown-button"]`).click();
  })
  
})