let countryDiv = document.getElementById("countryList");

class Team{
	//Масив обьктов всех стран
	static allCountry = [];
	//Считаем клики 1 и 2 
	static click = 0;
	//На какую страну кликаем последней
	static clickCountry = "";
	constructor(country,flag){
		this["Страна"] = country;
		this["Победы"] = 0;
		this["Поражения"] = 0;
		this["Ничья"] = 0;
		this["Количество Игр"] = this["Победы"]+this["Поражения"]+this["Ничья"];
		this["Рейтинг"] = (this["Победы"]*2)+this["Ничья"];
		this["Флаг"] = flag;
	}
	//Функция фиксации последней кликнутой страны
	static addClickCountry(name){
		Team.clickCountry = name;
	}
	//Добавляем Обьекты стран по порядку 
	static addCountry(name){
		return (Team.allCountry.push(name));
	}
	//Считаем клики 
	static addClick(num){
		if(num != 1){
			Team.click++;
		}else{
			Team.click = 0;
		}
		
	}
	//Рейтинг лист
	static changeRancList(id){
		let arrMax = [];
		//Собираем все рейтинги в масив
		 for(let i = 0 ; i < Team.allCountry.length ; i++){
		 	arrMax.push(Team.allCountry[i]["Рейтинг"]);
		 }
		 //Сортируем значение в масиве от максимального к минимальному
		 arrMax.sort(function(a, b) {
  			return b-a;
		});
		let str = "";
		id.innerHTML = "";
		let h2 = document.createElement("h2");
		h2.innerHTML = "Рейтинг";
		id.appendChild(h2);
		//Проходимся по масиву чисел от максимального к минимальному
		 for(let i = 0 ; i < arrMax.length ; i++){
		 	//Ищем совпадения с максимальным значением масива с обьектом всех стран по рейтингу, при совпадении пишем значение
		 	for(let k = 0 ; k < Team.allCountry.length;k++){
		 		if(arrMax[i] == Team.allCountry[k]["Рейтинг"] && str.indexOf(Team.allCountry[k]["Страна"]) == -1){
		 			str += Team.allCountry[k]["Страна"];
		 			let div = document.createElement("div");
					div.setAttribute("class","rankList");
					div.innerHTML ="<div>"+Team.allCountry[k]["Страна"]+"<br>Рейтинг :"+Team.allCountry[k]["Рейтинг"]+`</div><img src='${Team.allCountry[k]["Флаг"]}' width="50%">`;
					//div.innerHTML += ;
					id.appendChild(div);
					div.style.border = "solid 1px black";
					div.style.padding = "10px";
		 		}
		 	}
		 }
		 
	}
	newGame(scores){
		//Записываем результат игры , согласно полученным очкам scores,очки добавляем в рейтинг
		this["Рейтинг"]+=scores;
		switch (scores){
			case 2 : this["Победы"] ++;Team.allCountWin++;break;
			case 1 : this["Ничья"] ++ ; break;
			case 0 : this["Поражения"] ++ ;break;
			default : console.log("Неверное значение очков");return false;
		}
		return true;
	}
	//Создаем див Листа стран , и привязываем событие и функцию при нажатии 
	creatDiv(parentId,team,battlePlace){	
		//Создаем див
		let div = document.createElement("div");
		div.setAttribute("class","country");
		parentId.appendChild(div);
		//div.innerHTML = this["Страна"];
		let span = document.createElement("span");
		span.innerHTML = this["Страна"];
		span.setAttribute("class","textCountry");
		div.appendChild(span);
		div.style.backgroundImage = "url("+this["Флаг"]+")";
		let name = this["Страна"];
		let flag = this["Флаг"];
		//Привязываем к каждому диву событие по клику
		div.onclick = function(){
			
			//Убираем елемент нажатия
			div.style.display = "none";
			//Фиксируем первый клик или второй
			Team.addClick(0);
			//Если первый клик создаем див для боя , и фиксируем последнюю страну Клика, и вписывам в атрибут класс страну клика
			if(Team.click == 1){
				Team.addClickCountry(name);
				div.setAttribute("class","country "+name);
				let batleElemDiv = document.createElement("div");
				batleElemDiv.setAttribute("class","batleElem");
				battlePlace.appendChild(batleElemDiv);
				let userDiv1 = document.createElement("div");
				userDiv1.setAttribute("class","user");
				let userDiv2 = document.createElement("div");
				userDiv2.setAttribute("class","user");
				batleElemDiv.appendChild(userDiv1);
				batleElemDiv.appendChild(userDiv2);
			}
			//Второй клик сбрасываем счетчик клика , и назначам страну с которой будет бой в класс
			if(Team.click == 2){
			div.setAttribute("class","country "+Team.clickCountry);
			Team.addClick(1);
			}
			let batleElem = document.getElementsByClassName("user");
			Team.addCountry(team);

			for(let i = 0; i < batleElem.length ; i++){
				//Проверяем свободные ячейки и вписываем страны
			if(batleElem[i].innerHTML == "" ){
				batleElem[i].innerHTML = div.innerHTML+`<div class='flag'><img src='${flag}' width='100%' border='1'></div>`;
				//Проверяем первая ячейка или нет , если первая то вписываем кнопки результата игры
				if(i%2 == 0 || i == 0){
				let buttonWin = document.createElement("div");
				buttonWin.innerHTML = "+";
				buttonWin.setAttribute("class","button")
				batleElem[i].appendChild(buttonWin);
				let buttonLosse = document.createElement("div");
				buttonLosse.innerHTML = "-";
				buttonLosse.setAttribute("class","button");
				batleElem[i].appendChild(buttonLosse);
				let buttonDraw = document.createElement("div");
				buttonDraw.innerHTML = "0";
				buttonDraw.setAttribute("class","button");
				batleElem[i].appendChild(buttonDraw);
				//Событие победа
				buttonWin.onclick=function(){
					//Проверка на наличии полной пары , для боя
					if(batleElem[i+1].innerHTML != ""){
					let see = document.querySelectorAll(`.${name}`);
					//Востанавливаем див елемент в лист стран , через добавленный класс страны на которую первую кликнули
					for(let i =0;i<see.length;i++){
						see[i].style.display = "block";
					}
					//Рейтинг добавляем
					team.newGame(2);
					//Приписываем результат игры второму игроку в паре,через масив обьектов по порядку
					console.log(Team.allCountry[i+1].newGame(0))
					buttonDraw.style.display = "none";
					buttonLosse.style.display = "none";
					buttonWin.style.display = "none";
					let result = document.createElement("div");
					result.setAttribute("class","win");
					result.innerHTML = "Победа";
					batleElem[i].appendChild(result);
					let result2 = document.createElement("div");
					result2.setAttribute("class","loose");
					result2.innerHTML = "Поражение";
					batleElem[i+1].appendChild(result2);
					Team.changeRancList(rank);
					}
				}
				buttonLosse.onclick = function(){
					if(batleElem[i+1].innerHTML != ""){
					let see = document.querySelectorAll(`.${name}`);
					for(let i =0;i<see.length;i++){
						see[i].style.display = "block";
					}
					team.newGame(0);
					console.log(Team.allCountry[i+1].newGame(2))
					buttonDraw.style.display = "none";
					buttonLosse.style.display = "none";
					buttonWin.style.display = "none";
					let result = document.createElement("div");
					result.setAttribute("class","loose");
					result.innerHTML = "Поражение";
					batleElem[i].appendChild(result);
					let result2 = document.createElement("div");
					result2.setAttribute("class","win");
					result2.innerHTML = "Победа";
					batleElem[i+1].appendChild(result2);
					Team.changeRancList(rank);
					}

				}
				buttonDraw.onclick = function(){
					if(batleElem[i+1].innerHTML != ""){
					let see = document.querySelectorAll(`.${name}`);
					for(let i =0;i<see.length;i++){
						see[i].style.display = "block";
					}
					team.newGame(1);
					console.log(Team.allCountry[i+1].newGame(1))
					buttonDraw.style.display = "none";
					buttonLosse.style.display = "none";
					buttonWin.style.display = "none";
					let result = document.createElement("div");
					result.setAttribute("class","draw");
					result.innerHTML = "Ничья";
					batleElem[i].appendChild(result);
					let result2 = document.createElement("div");
					result2.setAttribute("class","draw");
					result2.innerHTML = "Ничья";
					batleElem[i+1].appendChild(result2);
					Team.changeRancList(rank);
					}
				}
				break;
				}
				break;
			};
		};
		};
	};
};

let team1 = new Team("Украина","img/1.png");
let team2 = new Team("Нидерланды","img/2.png");
let team3 = new Team("Венгрия","img/3.png");
let team4 = new Team("Германия","img/4.png");
let team5 = new Team("Бразилия","img/5.png");
let team6 = new Team("Англия","img/6.png");
let team7 = new Team("Италия","img/7.png");
let team8 = new Team("Испания","img/8.png");
let team9 = new Team("Франция","img/9.png");
let team10 = new Team("Чехия","img/10.png");
let team11 = new Team("Бельгия","img/11.png");
let team12 = new Team("Португалия","img/12.png");
let team13 = new Team("Хорватия","img/13.png");
let team14 = new Team("Уельс","img/14.png");
let team15 = new Team("Польша","img/15.png");
let team16 = new Team("Австрия","img/16.png");
team1.creatDiv(document.getElementById("countryList"),team1,document.getElementById("batleBlock"));
team2.creatDiv(document.getElementById("countryList"),team2,document.getElementById("batleBlock"));
team3.creatDiv(document.getElementById("countryList"),team3,document.getElementById("batleBlock"));
team4.creatDiv(document.getElementById("countryList"),team4,document.getElementById("batleBlock"));
team5.creatDiv(document.getElementById("countryList"),team5,document.getElementById("batleBlock"));
team6.creatDiv(document.getElementById("countryList"),team6,document.getElementById("batleBlock"));
team7.creatDiv(document.getElementById("countryList"),team7,document.getElementById("batleBlock"));
team8.creatDiv(document.getElementById("countryList"),team8,document.getElementById("batleBlock"));
team9.creatDiv(document.getElementById("countryList"),team9,document.getElementById("batleBlock"));
team10.creatDiv(document.getElementById("countryList"),team10,document.getElementById("batleBlock"));
team11.creatDiv(document.getElementById("countryList"),team11,document.getElementById("batleBlock"));
team12.creatDiv(document.getElementById("countryList"),team12,document.getElementById("batleBlock"));
team13.creatDiv(document.getElementById("countryList"),team13,document.getElementById("batleBlock"));
team14.creatDiv(document.getElementById("countryList"),team14,document.getElementById("batleBlock"));
team15.creatDiv(document.getElementById("countryList"),team15,document.getElementById("batleBlock"));
team16.creatDiv(document.getElementById("countryList"),team16,document.getElementById("batleBlock"));