document.getElementById('searchButton').addEventListener('click', function(){
    const keyword = document.getElementById('keyword').value;
    const keywordLink = `https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`;
    const allMeal = document.getElementById('allMeal');
    const ingredients = document.getElementById('ingredients');
    const noResult = document.getElementById('noResult');
    
    fetch(keywordLink)
    .then(res => res.json())
    .then(data => {
        allMeal.innerHTML = '';
        ingredients.innerHTML = '';
        noResult.innerHTML = '';
        displayData(data.meals, keyword);

    // onclick function on each item to show ingredients
    const catchDetails = document.getElementsByClassName('eachItem');
    for (let i = 0; i < catchDetails.length; i++) {
        catchDetails[i].addEventListener('click', function(data){
            console.log(data.path[1].id);
            const ingredientDetails = document.getElementsByClassName(data.path[1].id);
            ingredientDetails[0].style.display = 'block';
            document.getElementById('allMeal').style.display = 'none';
        });
    }   
    
    // back button functionalities
    const backButton = document.getElementsByClassName('backButton')
        for (let i = 0; i < backButton.length; i++) {
            backButton[i].addEventListener('click', function(){
                document.getElementById('allMeal').style.display = 'block';
                const eachIngredient = document.querySelectorAll('.vanish div');
                for (let i = 0; i < eachIngredient.length; i++) {
                    eachIngredient[i].style.display = 'none';
                }
            });
        }
})
})

// store and display data from API
const displayData =  (foods, keyword) => {
    if (foods === null || keyword == ''){
        const h1 = document.createElement('h1');
        h1.innerText = 'No search result found!!!';
        noResult.appendChild(h1);
        noResult.style.display = 'block';
    }
    else {
        foods.forEach(item => {
            const eachMeal = document.createElement('div');
            eachMeal.className = 'eachItem';
            eachMeal.id = item.idMeal;
            eachMeal.innerHTML = `
            <img src="${item.strMealThumb}" alt="">
            <h5>${item.strMeal}</h5>
            `;
            allMeal.appendChild(eachMeal);
            
            // ingredients details
            const eachIngredients = document.createElement('div');
            eachIngredients.className = item.idMeal;
            eachIngredients.innerHTML = ` <img src="${item.strMealThumb}" alt="">
            <h3>${item.strMeal}</h3>
            <h4>ingredients</h4>
            <ul id="${item.idMeal*2}"></ul>
            <button class="backButton">back</button>`;

            let ingredientLink = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.idMeal}`;
            fetch(ingredientLink)
            .then(res => res.json())
            .then(ingredientsData =>{
                const ul = document.getElementById(item.idMeal*2);
                for (let i = 1; i<20 ; i++) {
                    const ingredientMeasure = eval(`ingredientsData.meals[0].strMeasure${i}`);
                    const ingredientName = eval(`ingredientsData.meals[0].strIngredient${i}`);
                    if (ingredientMeasure!='' && ingredientName != '' && ingredientMeasure!= null){
                        const li = document.createElement('li');
                        li.innerText = ingredientMeasure +' '+ ingredientName;
                        ul.appendChild(li);
                    }
                }
            })
            ingredients.appendChild(eachIngredients);
        });        
    }
}