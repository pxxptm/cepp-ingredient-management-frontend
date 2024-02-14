import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Log } from './schema/log.shema';
import { CreateLogDto, UpdateLogDto } from './dto/log.dto';

@Injectable()
export class LogService {
  constructor(
    @InjectModel(Log.name)
    private readonly logModel: Model<Log>,
  ) {}

  async findByRestaurantId(restaurantId: string) {
    return await this.logModel.find({ restaurantId: restaurantId });
  }

  async create(createLogDto: CreateLogDto) {
    const createdLog = new this.logModel(createLogDto);
    await createdLog.save();
    return createdLog;
  }

  async update(logId: string, updateLogDto: UpdateLogDto) {
    return await this.logModel.findByIdAndUpdate(logId, updateLogDto, {
      new: true,
    });
  }
}
