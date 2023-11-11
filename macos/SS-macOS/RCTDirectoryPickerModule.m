//
//  RCTCalendarModule.m
//  SlackShots - MacOS
//
//  Created by Demi Daniel on 11/5/23.
//

#import "RCTDirectoryPickerModule.h"
#import <React/RCTLog.h>
#import <Cocoa/Cocoa.h>

@implementation DirectoryPickerModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(pickFile:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  dispatch_async(dispatch_get_main_queue(), ^{
    NSOpenPanel *panel = [NSOpenPanel openPanel];
    [panel setCanChooseFiles:NO];
    [panel setCanChooseDirectories:YES];
    [panel setAllowsMultipleSelection:NO];
    
    if ([panel runModal] == NSModalResponseOK) {
      NSURL *selectedFileURL = [panel URL];
      NSString *filePath = [selectedFileURL path];
      resolve(filePath);
    } else {
      NSError *error = [NSError errorWithDomain:@"YourAppDomain" code:1 userInfo:nil];
      reject(@"PICK_FILE_ERROR", @"Error picking file", error);
    }
  });
}

@end
