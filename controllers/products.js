
//5:02

const Product = require('./models/Product');

//pretrazivanje po kreiterijumu
// const getAllProductsStatic = async(req,res) =>{

//     // throw new Error('testing async errors');//ovo throw je moguce koristiti zato sto u app2.js imamo require('express-async-errors');,
//     //koristimo ga da ne bi morali kreirati trucatch blokove ili nas midleware
    
//     // const products = await Product.find({});
//     // const products = await Product.find({name:'albany sectional'});//filtriranje
//    const search ='ab';
//    const products = await Product.find({
//     name:{$regex:search,$options:'i'}//i znaci case insensititve ---> pronalazi nazive gdje imamo ab
//    });
     
//     res.status(200).json({products,nbHits:products.length});
// };

//pretraga prema kriterijumima tj.prema onome sto je zadato u putanji
// const getAllProducts = async(req,res) =>{
    
//     const {featured,company,name} = req.query;//ne moraju obavezno biti sva tri u putanji
//     const queryObject = {};

//     if(featured){
//         queryObject.featured = featured === 'true'? true:false;
//     }

//     if(company){
//         queryObject.company = company;
//     }

//     if(name){
//         queryObject.name = {$regex:name,$options:'i'};
//     }



//     console.log(queryObject);

//     const products = await Product.find(queryObject);//slucaj da nam nadje element prema parametrima koje su rucno zadali u postmanu
//     console.log(req.query);//kada u postmanu u putanji zadamo parametar po kom se pretrazuje,ova komanda nam ispise te parametre
//     res.status(200).json({products,nbHits:products.length});
// };


//sortiranje
// const getAllProductsStatic = async(req,res) =>{

//    const products = await Product.find({}).sort('-name price'); //sortira po imenu a kada imamo dva imena sa koja pocinju na isto slovo prvo ide onaj sa manjom cijenom
     
//     res.status(200).json({products,nbHits:products.length});
// };


//sortiranje prema kriterijumu tj.prema onome sto je zadato u putanji (u postamanu)
// const getAllProducts = async(req,res) =>{
    
//     const {featured,company,name,sort,fields} = req.query;//ne moraju obavezno biti sva tri u putanji,fielads nije atribut vec je ubacen zbog neke operacije
//     const queryObject = {};

//     if(featured){
//         queryObject.featured = featured === 'true'? true:false;
//     }

//     if(company){
//         queryObject.company = company;
//     }

//     if(name){
//         queryObject.name = {$regex:name,$options:'i'};
//     }

//     console.log(queryObject);
//     //koristimo let kada znamo da ce vrijednost varijable biti promijenjena
//     //ranije bilo let products ali je moralo biti promjenjeno u let result
//     let result =  Product.find(queryObject);//slucaj da nam nadje element prema parametrima koje su rucno zadali u postmanu
    
//     if(sort){
//     // console.log(sort);//ispisuje po cemu smo sortirali
//     const sortList = sort.split(',').join(' ');//prvo podijeli po zarezu pa ih spoji
//     result = result.sort(sortList);
//     }else{
//         result = result.sort('createAt');//iz modela jer su podaci kreirani u isto vrijeme?
//     }

//     if(fields){
//         const fieldsList = fields.split(',').join(' ');//prvo podijeli po zarezu pa ih spoji
//         result = result.select(fieldsList);
//     }

//     const page = Number(req.query.page) || 1;//paginacija,ako korisnik ne unese broj stranice po dufoltu neka bude prva
//     const products = await result;
//     const limit = Number(req.query.limit) || 10;
//     const skip = (page-1)*limit;
//     result = result.skip(skip).limit(limit);
//     //objasnjenje za paginaciju:ako imamo 23 elementa a zelimo da ih stavimo na 4 stranice onda ce doci do podjele na 7,7,7,2

//     console.log(req.query);//kada u postmanu u putanji zadamo parametar po kom se pretrazuje,ova komanda nam ispise te parametre
//     res.status(200).json({products,nbHits:products.length});
// };


// const getAllProductsStatic = async(req,res) =>{

//     const products = await Product.find({}).sort('name').select('name price').limit(4).skip(1);//izbaci elemente ali samo sa name i price (ostale atribute ne prikazuje)
//       //limit znaci koliko elemenata da se prikaze
//       //skip(1)-preskace se tj.ne prikazuje se prvi element
//      res.status(200).json({products,nbHits:products.length});
//  };


///////////pretrazivanje po numerickoj vrijednosti///////////////////////

const getAllProductsStatic = async(req,res) =>{

    const products = await Product.find({price :{$gt:30}}).sort('price').select('name price').limit(4).skip(1);//izbaci elemente ali samo sa name i price (ostale atribute ne prikazuje)
      //limit znaci koliko elemenata da se prikaze
      //skip(1)-preskace se tj.ne prikazuje se prvi element
     res.status(200).json({products,nbHits:products.length});
 };


 const getAllProducts = async(req,res) =>{
    
    const {featured,company,name,sort,fields,numericFilters} = req.query;//ne moraju obavezno biti sva tri u putanji,fielads nije atribut vec je ubacen zbog neke operacije
    const queryObject = {};

    if(featured){
        queryObject.featured = featured === 'true'? true:false;
    }

    if(company){
        queryObject.company = company;
    }

    if(name){
        queryObject.name = {$regex:name,$options:'i'};
    }

    if(numericFilters){
        const operatorMap = {
           '>':'$gt',
           '>=':'$gte',
           '=':'$e',
           '<':'$lt',
           '<=':'$lte'
        };
        const regEx= /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`);
        console.log(filters);
        const options = ['price','rating'];//atributi koji imaju numericku vrijednost
        filters = filters.split(',').forEach((item)=>{
            const [field,operator,value] = item.split('-');
            if(options.includes(field))
            {
                queryObject[field] = {[operator]:Number(value)};
            }

        });
    }

    console.log(queryObject);
    //koristimo let kada znamo da ce vrijednost varijable biti promijenjena
    //ranije bilo let products ali je moralo biti promjenjeno u let result
    let result =  Product.find(queryObject);//slucaj da nam nadje element prema parametrima koje su rucno zadali u postmanu
    
    if(sort){
    // console.log(sort);//ispisuje po cemu smo sortirali
    const sortList = sort.split(',').join(' ');//prvo podijeli po zarezu pa ih spoji
    result = result.sort(sortList);
    }else{
        result = result.sort('createAt');//iz modela jer su podaci kreirani u isto vrijeme?
    }

    if(fields){
        const fieldsList = fields.split(',').join(' ');//prvo podijeli po zarezu pa ih spoji
        result = result.select(fieldsList);
    }

    const page = Number(req.query.page) || 1;//paginacija,ako korisnik ne unese broj stranice po dufoltu neka bude prva
    const products = await result;
    const limit = Number(req.query.limit) || 10;
    const skip = (page-1)*limit;
    result = result.skip(skip).limit(limit);
    //objasnjenje za paginaciju:ako imamo 23 elementa a zelimo da ih stavimo na 4 stranice onda ce doci do podjele na 7,7,7,2

    console.log(req.query);//kada u postmanu u putanji zadamo parametar po kom se pretrazuje,ova komanda nam ispise te parametre
    res.status(200).json({products,nbHits:products.length});
};



module.exports = {
    getAllProducts,getAllProductsStatic
};


