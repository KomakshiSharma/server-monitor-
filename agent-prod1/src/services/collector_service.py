from src.collectors.cpu import CPUCollector

from src.collectors.memory import MemoryCollector

from src.collectors.disk import DiskCollector



from src.models.metric import Metric





class CollectorService:



    @staticmethod

    def collect() -> Metric:

       cpu = CPUCollector.usage()

       memory = MemoryCollector.usage()

       disk = DiskCollector.usage()



       return Metric(

            cpu_usage=cpu,

            memory_usage=memory,

            disk_usage=disk

        )
