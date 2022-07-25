import React from 'react';
import {View} from 'react-native';
import {ReactNativeZoomableView} from '@dudigital/react-native-zoomable-view/dist';
import ClassRoom from './classroom';

export default function Zoomable() {
  return (
    <View>
      <ReactNativeZoomableView
        maxZoom={2}
        minZoom={0.7}
        zoomStep={0.3}
        initialZoom={0.8}
        bindToBorder={false}>
        <View>
          {/* Horizontal class section
                       First  horizontal class row */}
          <View style={{flexDirection: 'row'}}>
            <ClassRoom classroomnum={'001'} booked="True" />
            <ClassRoom classroomnum={'002'} />
            <ClassRoom classroomnum={'003'} />
            <ClassRoom classroomnum={'004'} />
            <ClassRoom classroomnum={'005'} />
            <ClassRoom classroomnum={'006'} booked="True" />
          </View>

          {/* Second horizontal class row */}
          <View style={{flexDirection: 'row-reverse'}}>
            <ClassRoom classroomnum={'007'} />
            <ClassRoom classroomnum={'008'} />
            <ClassRoom classroomnum={'009'} />
            <ClassRoom classroomnum={'010'} />
            <ClassRoom classroomnum={'011'} />
            <ClassRoom classroomnum={'012'} />
          </View>

          {/*  vertical class section */}

          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            {/* First vertical class row */}
            <View>
              <ClassRoom classroomnum={'013'} />
              <ClassRoom classroomnum={'014'} />
              <ClassRoom classroomnum={'015'} />
              <ClassRoom classroomnum={'016'} />
              <ClassRoom classroomnum={'017'} />
              <ClassRoom classroomnum={'018'} />
            </View>
            {/* Second vertical class row */}
            <View>
              <ClassRoom classroomnum={'019'} />
              <ClassRoom classroomnum={'020'} />
              <ClassRoom classroomnum={'021'} />
              <ClassRoom classroomnum={'022'} />
              <ClassRoom classroomnum={'023'} />
              <ClassRoom classroomnum={'024'} />
            </View>
          </View>

          {/* Horizontal class section
                       First  horizontal class row */}
          <View style={{flexDirection: 'row'}}>
            <ClassRoom classroomnum={'025'} />
            <ClassRoom classroomnum={'026'} />
            <ClassRoom classroomnum={'027'} />
            <ClassRoom classroomnum={'028'} />
            <ClassRoom classroomnum={'029'} />
            <ClassRoom classroomnum={'030'} />
          </View>

          {/* Second horizontal class row */}
          <View style={{flexDirection: 'row-reverse'}}>
            <ClassRoom classroomnum={'031'} />
            <ClassRoom classroomnum={'032'} />
            <ClassRoom classroomnum={'033'} />
            <ClassRoom classroomnum={'034'} />
            <ClassRoom classroomnum={'035'} />
            <ClassRoom classroomnum={'036'} />
          </View>
        </View>
      </ReactNativeZoomableView>
    </View>
  );
}
