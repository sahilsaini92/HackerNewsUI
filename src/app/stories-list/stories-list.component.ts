import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Story } from '../models/story';
import { HttpClient } from '@angular/common/http';
import { StoryService } from '../services/story-service.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-stories-list',
  templateUrl: './stories-list.component.html',
  styleUrls: ['./stories-list.component.css']
})
export class StoriesListComponent implements OnInit {
  hackerNewsStoryList: Story[]=[];
  pageSize = 10;
  pageIndex = 0;

  hidePageSize = true;
  showFirstLastButtons = true;
  disabled = false;
  totalCount:number=0;

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.totalCount = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getStories('');
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private storyService: StoryService,private httpClient: HttpClient) {

  }

  ngOnInit(): void {
    this.getStories("");
  }

  search(event: KeyboardEvent) {
    this.getStories((event.target as HTMLTextAreaElement).value);
  }
  
  getStories(searchTerm: string) {
    var pageIndex = this.pageIndex;
    const pageSize = this.pageSize;
    pageIndex = pageIndex+1;
    this.storyService.getTopStories(searchTerm,pageIndex, pageSize).subscribe(
        (result:any) => {
          this.hackerNewsStoryList = result.stories;
          this.totalCount=result.totalCount;
        },
        error => console.error(error)
      );
  }

  open(url: string) {
    window.open(url, "_blank");
  }
}
