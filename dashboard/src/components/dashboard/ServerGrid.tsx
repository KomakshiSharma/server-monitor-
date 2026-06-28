import MetricCard from "./MetricCard"

export default function ServerGrid(){

    return(

        <div className="grid grid-cols-3 gap-6">

            <MetricCard
                title="CPU Usage"
                value={40}
                color="text-green-400"
            />

            <MetricCard
                title="RAM Usage"
                value={68}
                color="text-yellow-400"
            />

            <MetricCard
                title="Disk Usage"
                value={82}
                color="text-red-400"
            />

        </div>

    )

}
