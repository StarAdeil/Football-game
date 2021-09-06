//"use strict"; 
class Team {
	static allCountWin = 0;
	constructor(name,country,win,loose,draw){
		this["Имя Команды"] = name;
		this["Страна"] = country;
		this["Победы"] = win;
		this["Поражения"] = loose;
		this["Ничья"] = draw;
		this["Количество Игр"] = this["Победы"]+this["Поражения"]+this["Ничья"];
		this["Рейтинг"] = (this["Победы"]*2)+this["Ничья"];
		Team.allCountWin += win;
	}
	static resOffWin(){
		return (Team.allCountWin*2);
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
}
let team1 = new Team("Акулы","Украина",0,0,0);
console.log(team1);
console.log(team1.newGame(2));
console.log(team1);
let team2 = new Team("Барсуки","Украина",0,0,0);
console.log(team2);
console.log(team2.newGame(2));
console.log(team2);
console.log(Team.allCountWin);