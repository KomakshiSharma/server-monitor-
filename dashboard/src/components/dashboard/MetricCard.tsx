interface Props{

    title:string

    value:number

    color:string

}

export default function MetricCard({

    title,

    value,

    color

}:Props){

    return(

        <div className="bg-slate-900 rounded-xl p-6 shadow">

            <h3 className="text-slate-400">

                {title}

            </h3>

            <p className={`text-4xl font-bold mt-3 ${color}`}>

                {value}%

            </p>

        </div>

    )

}
