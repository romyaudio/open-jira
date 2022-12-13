
interface SeedData {
    entries:SeedEntry[]
}

interface SeedEntry{
    description:string,
            status:string,
            createAt:number
}

export const seedData:SeedData ={
    entries:[
        {
           
            description:'Pendiente Description',
            status:'pending',
            createAt:Date.now()
          },
          {
           
            description:'In-progreso Description',
            status:'in-progress',
            createAt:Date.now()-1000000
          },
          {
           
            description:'Termnada Description',
            status:'finished',
            createAt:Date.now()-100000
          },
    ]
}