const URL='../assets/json/api.json';

const appConfig = {
    data(){
        return {
            title: 'Flags',
            ratesList:[],
            sortType: 1,
            
            
            search:''
        }
    },
    methods:{

        searchFilter(item){
            let list=this.search.toLowerCase().trim();
            
            let listGlobal=item.name.common.toLowerCase().trim();

            if (listGlobal.indexOf(list) != -1){
                return true;

            }
            if ( item.cca3.toLowerCase().trim().indexOf(list)!= -1 ){
                return true;
            }

            if ( item.cca2.toLowerCase().trim().indexOf(list)!= -1 ){
                return true;
            }

            if ( item.capital.toLowerCase().trim().indexOf(list)!= -1 ){
                return true;
            }

            
        },
        TumblerSort(columnNumber){

                if (this.sortType == columnNumber){
                    this.sortType=columnNumber+1;
                } else {
                    this.sortType=columnNumber;
                }

                
            /*if (columnNumber == 1){
                if (this.sortType == 1){
                    this.sortType=1+1;
                } else {
                    this.sortType=1;
                }
            } else if (columnNumber == 3){
                if (this.sortType == 3){
                    this.sortType=3+1;
                } else {
                    this.sortType=3;
                }
            } else {
                if (this.sortType == 5){
                    this.sortType=5+1;
                } else {
                    this.sortType=5;
                }
            }*/
            // 1-1,2 ,  2-3, 4,  3-5,6
            
        }
            
        
        
    

        
      
    },
   computed:{
        Sort(){

            
            let list1 = this.ratesList.filter(this.searchFilter);
            if (!this.searchFilter){
                list1 = this.ratesList;
            }
            
            

            let copy_of_sortType = this.sortType;

            if(this.sortType==1 || this.sortType==3 || this.sortType==5){
                
                    list1.sort(
                        function (a, b) {


                            if (copy_of_sortType==1){
                                a=a.name.common; //this.sortType здесь this - невидимый параметр функции, но здесь он относится к sort, а нам нужен this, который относится к родительской функции, поэтому мы выше переприсвоили значение с this в новую переменную 
                                b=b.name.common;
                
                            }else if (copy_of_sortType==3){
                                    a=a.cca2;
                                    b=b.cca2;
                
                            }else{
                                a = a.capital;
                                b= b.capital;
                            }


                            if (a< b) {
                            return -1;
                            }
                            if (a > b) {
                            return 1;
                            }
                            // a должно быть равным b
                            return 0;
                        }        
                    );
            }
                else {
                    list1.sort(
                        function (a, b) {

                            if (copy_of_sortType==2){
                                a=a.name.common;
                                b=b.name.common;
                
                            }else if (copy_of_sortType==4){
                                    a=a.cca2;
                                    b=b.cca2;
                
                            }else{
                                a = a.capital;
                                b= b.capital;
                            }





                            if (a < b) {
                            return 1;
                            }
                            if (a > b) {
                            return -1;
                            }
                            // a должно быть равным b
                            return 0;
                        }
                    );
                }
            return list1;
        }

        


   }
    ,
    async mounted(){
        let result = await fetch(URL);
        result = await result.json();
        console.log(result);
        

        for(i=0; i<result.length; i++){
            let Flag=result[i].cca3.toLowerCase();
            
                
            result[i].flag = `https://countries.petethompson.net/data/flags/${Flag}.svg`;
            for (j=0; j<result[i].borders.length; j++){
                result[i].borders[j]= `https://countries.petethompson.net/data/flags/${result[i].borders[j].toLowerCase()}.svg`;
            }
        }
        this.ratesList = result;
        console.log(this.ratesList);

        this.TumblerSort(this.sortName, this.sortCode, this.sortCapital );
        this.TumblerSort(this.sortCode, this.sortName, this.sortCapital );
        this.TumblerSort(this.sortCapital, this.sortName, this.sortCode);
        //Sort(this.sortName, );


    }

   
    
    
    

};

const app = Vue.createApp(appConfig);
app.mount('#app');

/*

  let arr = { x:1, y:2, sortfunc:function(){...}, sortfunc(); };



  x.sort()
  let aaa = 10;
*/