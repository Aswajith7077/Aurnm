import {Queue,Worker} from 'bullmq';


class ScrapeQueue{
    queue:Queue;
    connection:any;
    worker:Worker;
    constructor(){
        this.connection = ;
        this.queue = new Queue('scrape-queue',{connection:this.connection});
        this.worker = new Worker('scrape-queue',);
    }
}