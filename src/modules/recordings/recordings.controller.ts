import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  ParseIntPipe, 
  Query 
} from '@nestjs/common';
import { RecordingsService } from './recordings.service';
import { Recording } from './recording.entity';
import { CreateRecordingDto } from './dto/create-recording.dto';

@Controller('recordings')
export class RecordingsController {
  constructor(private readonly recordingsService: RecordingsService) {}

  @Get()
  async getRecordings(
    @Query('user_id') user_id?: number,
    @Query('topic_id') topic_id?: number
  ): Promise<Recording[]> {
    if (user_id) {
      return this.recordingsService.getRecordingsByUserId(user_id);
    }
    if (topic_id) {
      return this.recordingsService.getRecordingsByTopicId(topic_id);
    }
    return this.recordingsService.getAllRecordings();
  }

  @Get(':id')
  async getRecordingById(@Param('id', ParseIntPipe) id: number) {
    return this.recordingsService.getRecordingById(id);
  }

  @Get('user/:user_id/total-time')
  async getUserTotalRecordingTime(@Param('user_id', ParseIntPipe) user_id: number) {
    return this.recordingsService.getUserTotalRecordingTime(user_id);
  }

  @Post()
  async createRecording(@Body() createRecordingDto: CreateRecordingDto): Promise<Recording> {
    return this.recordingsService.createRecording(createRecordingDto);
  }

  @Put(':id')
  async updateRecording(
    @Param('id', ParseIntPipe) id: number, 
    @Body() recordingData: Partial<Recording>
  ) {
    return this.recordingsService.updateRecording(id, recordingData);
  }

  @Delete(':id')
  async deleteRecording(@Param('id', ParseIntPipe) id: number) {
    return this.recordingsService.deleteRecording(id);
  }
}
