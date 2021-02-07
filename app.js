
document.getElementById('searchButton').addEventListener('click', function(){
    const keyword = document.getElementById('keyword').value;
    const keywordLink = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + keyword;
    const allMeal = document.getElementById('allMeal');
    const ingredients = document.getElementById('ingredients');
    const noResult = document.getElementById('noResult');
    
    fetch(keywordLink)
    .then(res => res.json())
    .then(data => {
        console.log(data.meals);
        allMeal.innerHTML = '';
        ingredients.innerHTML = '';
        noResult.innerHTML = '';

        if (data.meals === null || keyword == ''){
            const h1 = document.createElement('h1');
            h1.innerText = 'No search result found!!!';
            noResult.appendChild(h1);
            noResult.style.display = 'block';
        }
        else {
            data.meals.forEach(item => {
                // food details
                const eachMeal = document.createElement('div');
                eachMeal.id = item.idMeal;
                eachMeal.className += " eachItem";
                const mealImage = document.createElement('img');
                mealImage.src = item.strMealThumb;
                const mealName = document.createElement('h5');
                mealName.innerText = item.strMeal;
                eachMeal.appendChild(mealImage);
                eachMeal.appendChild(mealName);
                allMeal.appendChild(eachMeal);
                
                // ingredients details
                const eachIngredients = document.createElement('div');
                eachIngredients.className = item.idMeal;
                const ingredientImage = document.createElement('img');
                ingredientImage.src = item.strMealThumb;
                const foodName = document.createElement('h3');
                foodName.innerText = item.strMeal;
                const title = document.createElement('h4');
                title.innerText = 'ingredients';
                const ul = document.createElement('ul');
                
                const backButton = document.createElement('button');
                backButton.innerText = 'back';
                backButton.className = 'backButton';

                const ingredientLink = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + item.idMeal;
                fetch(ingredientLink)
                .then(res => res.json())
                .then(data =>{
                    console.log(data.meals[0]);
                    for (let i = 1; i<20 ; i++) {
                        const measure = eval(`item.strMeasure${i}`);
                        const name = eval(`item.strIngredient${i}`);
                        if (measure!='' && name != '' && measure!= null){
                            const li = document.createElement('li');
                            const final = measure +' '+ name;
                            li.innerText = final;
                            ul.appendChild(li);
                        }
                    }
                })
                eachIngredients.appendChild(ingredientImage);
                eachIngredients.appendChild(foodName);
                eachIngredients.appendChild(title);
                eachIngredients.appendChild(ul);
                eachIngredients.appendChild(backButton);
                ingredients.appendChild(eachIngredients);
            });        
        }

    // onclick function on each item to show gredients
    const catchDetails = document.getElementsByClassName('eachItem');
    console.log(catchDetails);
    for (let i = 0; i < catchDetails.length; i++) {
        catchDetails[i].addEventListener('click', function(data){
            console.log(data.path[1].id);
            const a = document.getElementsByClassName(data.path[1].id);
            for (let i = 0; i < a.length; i++) {
                console.log(a[i]);
                a[i].style.display = 'block';
            }
            document.getElementById('allMeal').style.display = 'none';
        });
    }   
    
    // back button functionalities
    const c = document.getElementsByClassName('backButton')
        for (let i = 0; i < c.length; i++) {
            c[i].addEventListener('click', function(){
                document.getElementById('allMeal').style.display = 'block';
                const d = document.querySelectorAll('.vanish div');
                for (let i = 0; i < d.length; i++) {
                    d[i].style.display = 'none';
                }
            });
        }
})
})