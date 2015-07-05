var aggregatorStrokeWidth = 3;
var aggregatorStrokeColor = darkenrgb(159, 198, 153);
var aggregatorFillColor = rgb(202, 224, 199);

var Aggregator = fabric.util.createClass(fabric.Object, {
    type: 'aggregator',
    initialize: function (options) {
        options || (options = {});
        this.callSuper('initialize', options);

//        this.set('hasRotatingPoint', false);
        this.set('hasBorders', false);
//        this.set('hasControls', false);
        this.set('transparentCorners', false);

        this.hasControls = false;

        this.childrenRadius = 20;
        this.verticalSeparation = 10;
        this.childrenStrokeWidth = 2;
        this.additionalWidth = 2 * this.childrenRadius + 10;
        this.verticalSpace = 4;

        this.compressedWidth = 145;
        this.indent = 15;



        this.set('isAggregator', true);


        this.set('width', options.width || this.compressedWidth);
        this.set('transitionWidth', this.compressedWidth);




        this.set('childrenFillColor', options.childrenFillColor || rgb(253, 149, 169));
        this.set('childrenStrokeColor', options.childrenFillColor || darkenrgb(254, 128, 153));


//        this.childrenFillColor = rgb(147, 196, 193);
//        this.childrenStrokeColor = darkenrgb(147, 196, 193);




//        this.set('fill', options.fill || rgb(172, 203, 245));
//        this.set('stroke', options.stroke || darkenrgb(172, 203, 245));

        this.set('fill', options.fill || aggregatorFillColor);
        this.set('stroke', options.stroke || aggregatorStrokeColor);

//        this.set('fill', options.fill || rgb(184, 213, 179));
//        this.set('stroke', options.stroke || darkenrgb(184, 213, 179));

//        this.set('fill', options.fill || rgb(211, 214, 226));
//        this.set('stroke', options.stroke || darkenrgb(211, 214, 226));



        this.set('strokeWidth', aggregatorStrokeWidth || 3);






        this.set('isCompressed', false);
        this.set('rx', 33);
        this.set('ry', 33);

        this.set('originX', 'center');
        this.set('originY', 'center');


        this.set('inConnectors', new Array());
        this.set('outConnectors', new Array());
        this.set('widgets', new Array());


        this.on('doubleTap', function (option) {
            if (this.isCompressed) {
                this.expand();
            } else {
                this.compress();
            }
        });

        this.on('valueSelected', function (options) {
            var index = options.index;
            canvasDeselectAllObjects();
            this.inConnectors[index].destination.applySelectedStyle(true);
        });

        this.on('rotating', function (option) {
            objectMoving(option, this);
            this.inConnectors.forEach(function (connector) {
                connector.set({'x2': connector.destination.left, 'y2': connector.destination.top});
            });
        });
        this.on('scaling', function (option) {
            objectMoving(option, this);
            this.inConnectors.forEach(function (connector) {
                connector.set({'x2': connector.destination.left, 'y2': connector.destination.top});
            });
        });

        this.on('pressed', function (option) {
            var theAggregator = this;

            theAggregator.lockMovementX = true;
            theAggregator.lockMovementY = true;

            theAggregator.blink();

            // Gathering the values that should be output by this operator
            theAggregator.gatherValues(false);

            var newConnector = new Connector({source: theAggregator, x2: theAggregator.left, y2: theAggregator.top, arrowColor: aggregatorStrokeColor, filledArrow: true});
            theAggregator.outConnectors.push(newConnector);
            canvas.add(newConnector);
        });

        this.on('moving', function (option) {
            var theAggregator = this;
            theAggregator.moving = true;

            if (theAggregator.lockMovementX && theAggregator.lockMovementY) {
                if (LOG) console.log("Output being created from an aggregator");

                var theEvent = option.e;

                if (theEvent) {
                    var canvasCoords = getCanvasCoordinates(theEvent);
                    var lastAddedConnector = getLastElementOfArray(theAggregator.outConnectors);
                    lastAddedConnector.set({x2: canvasCoords.x, y2: canvasCoords.y});
                    canvas.renderAll();
                }


            } else {
                objectMoving(option, this);
                // instead of triggering the 'moving' event of each widget of this aggregator, we
                // reposition the connectors directly, as this is more efficient
                theAggregator.inConnectors.forEach(function (connector) {
                    connector.set({'x2': connector.destination.left, 'y2': connector.destination.top});
                });
            }

        });




//        var sortPath = 'M -1900.5298,2907.2801 -1900.5298,2985.9676 -1816.3423,2985.9676 -1816.3423,2907.2801 z M -1881.8501,2913.1238 -1864.7407,2913.1238 -1864.7407,2958.4988 -1856.186,2958.4988 -1873.2954,2982.3113 -1890.4048,2958.4988 -1881.8501,2958.4988 z M -1840.0298,2912.5613 C -1832.5484,2912.5613 -1826.4673,2918.6423 -1826.4673,2926.1238 -1826.4673,2933.6054 -1832.5484,2939.6551 -1840.0298,2939.6551 -1847.5115,2939.6551 -1853.561,2933.6054 -1853.561,2926.1238 -1853.561,2918.6423 -1847.5115,2912.5613 -1840.0298,2912.5613 z M -1840.0298,2944.9676 C -1834.5846,2944.9676 -1830.1548,2949.3975 -1830.1548,2954.8426 -1830.1548,2960.2878 -1834.5846,2964.6863 -1840.0298,2964.6863 -1845.475,2964.6863 -1849.8735,2960.2878 -1849.8735,2954.8426 -1849.8735,2949.3975 -1845.475,2944.9676 -1840.0298,2944.9676 z M -1840.0298,2969.7488 C -1836.7631,2969.7488 -1834.1235,2972.4196 -1834.1235,2975.6863 -1834.1235,2978.9529 -1836.7631,2981.5926 -1840.0298,2981.5926 -1843.2965,2981.5926 -1845.936,2978.9529 -1845.936,2975.6863 -1845.936,2972.4196 -1843.2965,2969.7488 -1840.0298,2969.7488 z' ;
//        var sortPath = 'M -1841.7819,2971.8367 C -1842.508,2971.8367 -1843.2095,2971.9855 -1843.838,2972.2535 -1844.4663,2972.5215 -1845.0301,2972.9143 -1845.505,2973.3926 -1845.9798,2973.871 -1846.3509,2974.4287 -1846.6163,2975.0597 -1846.8817,2975.6907 -1847.0331,2976.3896 -1847.0331,2977.1157 -1847.0331,2977.8418 -1846.8817,2978.5432 -1846.6163,2979.1717 -1846.3509,2979.8001 -1845.9798,2980.3639 -1845.505,2980.8388 -1845.0301,2981.3136 -1844.4663,2981.6847 -1843.838,2981.9501 -1843.2095,2982.2155 -1842.508,2982.3669 -1841.7819,2982.3669 -1841.0558,2982.3669 -1840.3543,2982.2155 -1839.7259,2981.9501 -1839.0974,2981.6847 -1838.5338,2981.3136 -1838.0589,2980.8388 -1837.584,2980.3639 -1837.2129,2979.8001 -1836.9475,2979.1717 -1836.6821,2978.5432 -1836.5308,2977.8418 -1836.5308,2977.1157 -1836.5308,2976.3896 -1836.6821,2975.6907 -1836.9475,2975.0597 -1837.2129,2974.4287 -1837.584,2973.871 -1838.0589,2973.3926 -1838.5338,2972.9143 -1839.0974,2972.5215 -1839.7259,2972.2535 -1840.3543,2971.9855 -1841.0558,2971.8367 -1841.7819,2971.8367 z M -1842.3239,2953.9354 C -1843.3367,2953.9354 -1844.3072,2954.1443 -1845.1838,2954.5167 -1846.0602,2954.889 -1846.8465,2955.4326 -1847.5089,2956.0977 -1848.1711,2956.763 -1848.6966,2957.5441 -1849.0667,2958.4228 -1849.4368,2959.3015 -1849.648,2960.2699 -1849.648,2961.2828 -1849.648,2962.2956 -1849.4368,2963.2661 -1849.0667,2964.1426 -1848.6966,2965.0191 -1848.1711,2965.8054 -1847.5089,2966.4677 -1846.8465,2967.13 -1846.0602,2967.6554 -1845.1838,2968.0256 -1844.3072,2968.3956 -1843.3367,2968.6068 -1842.3239,2968.6068 -1841.311,2968.6068 -1840.3427,2968.3956 -1839.464,2968.0256 -1838.5852,2967.6554 -1837.8041,2967.13 -1837.1389,2966.4677 -1836.4737,2965.8054 -1835.9301,2965.0191 -1835.5578,2964.1426 -1835.1855,2963.2661 -1834.9765,2962.2956 -1834.9765,2961.2828 -1834.9765,2960.2699 -1835.1855,2959.3015 -1835.5578,2958.4228 -1835.9301,2957.5441 -1836.4737,2956.763 -1837.1389,2956.0977 -1837.8041,2955.4326 -1838.5852,2954.889 -1839.464,2954.5167 -1840.3427,2954.1443 -1841.311,2953.9354 -1842.3239,2953.9354 z M -1881.8423,2927.2685 -1881.8423,2960.6435 -1890.4048,2960.6435 -1873.2798,2982.456 -1856.1861,2960.6435 -1864.7486,2960.6435 -1864.7486,2927.2685 z M -1841.5303,2927.2024 C -1842.3419,2927.2024 -1843.1248,2927.2896 -1843.8898,2927.4466 -1844.6548,2927.6035 -1845.411,2927.8264 -1846.1137,2928.1245 -1846.8163,2928.4226 -1847.4688,2928.786 -1848.0935,2929.2094 -1848.7182,2929.6327 -1849.2982,2930.114 -1849.8292,2930.6468 -1850.3603,2931.1795 -1850.8449,2931.7562 -1851.2666,2932.3825 -1851.6883,2933.0088 -1852.0546,2933.6855 -1852.3515,2934.3894 -1852.6483,2935.0933 -1852.8732,2935.8476 -1853.0294,2936.6133 -1853.1857,2937.379 -1853.2736,2938.1612 -1853.2736,2938.9728 -1853.2736,2939.7844 -1853.1857,2940.5673 -1853.0294,2941.3323 -1852.8732,2942.0973 -1852.6483,2942.8535 -1852.3515,2943.5562 -1852.0546,2944.2588 -1851.6883,2944.9113 -1851.2666,2945.536 -1850.8449,2946.1607 -1850.3603,2946.7407 -1849.8292,2947.2717 -1849.2982,2947.8027 -1848.7182,2948.2874 -1848.0935,2948.7091 -1847.4688,2949.1308 -1846.8163,2949.4971 -1846.1137,2949.794 -1845.411,2950.0908 -1844.6548,2950.3157 -1843.8898,2950.4719 -1843.1248,2950.6281 -1842.3419,2950.7161 -1841.5303,2950.7161 -1840.7187,2950.7161 -1839.9365,2950.6281 -1839.1708,2950.4719 -1838.4051,2950.3157 -1837.6508,2950.0908 -1836.947,2949.794 -1836.243,2949.4971 -1835.5663,2949.1308 -1834.94,2948.7091 -1834.3137,2948.2874 -1833.737,2947.8027 -1833.2043,2947.2717 -1832.6715,2946.7407 -1832.1902,2946.1607 -1831.7669,2945.536 -1831.3435,2944.9113 -1830.9802,2944.2588 -1830.682,2943.5562 -1830.3839,2942.8535 -1830.161,2942.0973 -1830.0041,2941.3323 -1829.8471,2940.5673 -1829.7599,2939.7844 -1829.7599,2938.9728 -1829.7599,2938.1612 -1829.8471,2937.379 -1830.0041,2936.6133 -1830.161,2935.8476 -1830.3839,2935.0933 -1830.682,2934.3894 -1830.9802,2933.6855 -1831.3435,2933.0088 -1831.7669,2932.3825 -1832.1902,2931.7562 -1832.6715,2931.1795 -1833.2043,2930.6468 -1833.737,2930.114 -1834.3137,2929.6327 -1834.94,2929.2094 -1835.5663,2928.786 -1836.243,2928.4226 -1836.947,2928.1245 -1837.6508,2927.8264 -1838.4051,2927.6035 -1839.1708,2927.4466 -1839.9365,2927.2896 -1840.7187,2927.2024 -1841.5303,2927.2024 z';
//        var sortPath = 'M -1845.4714,2972.7073 C -1846.1407,2972.7073 -1846.7872,2972.8444 -1847.3665,2973.0915 -1847.9456,2973.3385 -1848.4653,2973.7005 -1848.903,2974.1414 -1849.3406,2974.5823 -1849.6827,2975.0963 -1849.9273,2975.6779 -1850.1719,2976.2595 -1850.3115,2976.9037 -1850.3115,2977.573 -1850.3115,2978.2422 -1850.1719,2978.8887 -1849.9273,2979.468 -1849.6827,2980.0472 -1849.3406,2980.5668 -1848.903,2981.0046 -1848.4653,2981.4422 -1847.9456,2981.7842 -1847.3665,2982.0289 -1846.7872,2982.2735 -1846.1407,2982.413 -1845.4714,2982.413 -1844.8022,2982.413 -1844.1556,2982.2735 -1843.5764,2982.0289 -1842.9971,2981.7842 -1842.4776,2981.4422 -1842.0399,2981.0046 -1841.6022,2980.5668 -1841.2601,2980.0472 -1841.0155,2979.468 -1840.7709,2978.8887 -1840.6314,2978.2422 -1840.6314,2977.573 -1840.6314,2976.9037 -1840.7709,2976.2595 -1841.0155,2975.6779 -1841.2601,2975.0963 -1841.6022,2974.5823 -1842.0399,2974.1414 -1842.4776,2973.7005 -1842.9971,2973.3385 -1843.5764,2973.0915 -1844.1556,2972.8444 -1844.8022,2972.7073 -1845.4714,2972.7073 z M -1845.971,2957.1293 C -1846.9045,2957.1293 -1847.799,2957.3218 -1848.607,2957.6651 -1849.4147,2958.0082 -1850.1395,2958.5093 -1850.75,2959.1223 -1851.3604,2959.7355 -1851.8447,2960.4554 -1852.1858,2961.2653 -1852.527,2962.0752 -1852.7216,2962.9678 -1852.7216,2963.9014 -1852.7216,2964.8349 -1852.527,2965.7294 -1852.1858,2966.5373 -1851.8447,2967.3452 -1851.3604,2968.0699 -1850.75,2968.6804 -1850.1395,2969.2908 -1849.4147,2969.7751 -1848.607,2970.1163 -1847.799,2970.4573 -1846.9045,2970.652 -1845.971,2970.652 -1845.0374,2970.652 -1844.1449,2970.4573 -1843.335,2970.1163 -1842.525,2969.7751 -1841.8051,2969.2908 -1841.1919,2968.6804 -1840.5788,2968.0699 -1840.0778,2967.3452 -1839.7346,2966.5373 -1839.3915,2965.7294 -1839.1988,2964.8349 -1839.1988,2963.9014 -1839.1988,2962.9678 -1839.3915,2962.0752 -1839.7346,2961.2653 -1840.0778,2960.4554 -1840.5788,2959.7355 -1841.1919,2959.1223 -1841.8051,2958.5093 -1842.525,2958.0082 -1843.335,2957.6651 -1844.1449,2957.3218 -1845.0374,2957.1293 -1845.971,2957.1293 z M -1879.8352,2933.472 -1879.8352,2964.2339 -1888.4439,2964.2339 -1873.5037,2982.4951 -1858.5634,2964.2339 -1867.5406,2964.2339 -1867.5406,2933.472 z M -1845.2395,2933.4111 C -1845.9876,2933.4111 -1846.7092,2933.4914 -1847.4143,2933.6361 -1848.1194,2933.7808 -1848.8164,2933.9862 -1849.4641,2934.261 -1850.1116,2934.5357 -1850.7131,2934.8707 -1851.2888,2935.2609 -1851.8646,2935.6511 -1852.3992,2936.0947 -1852.8886,2936.5858 -1853.3782,2937.0768 -1853.8248,2937.6083 -1854.2135,2938.1856 -1854.6022,2938.7628 -1854.9398,2939.3866 -1855.2135,2940.0354 -1855.487,2940.6841 -1855.6943,2941.3794 -1855.8383,2942.0851 -1855.9823,2942.7909 -1856.0634,2943.5118 -1856.0634,2944.2599 -1856.0634,2945.008 -1855.9823,2945.7296 -1855.8383,2946.4347 -1855.6943,2947.1398 -1855.487,2947.8368 -1855.2135,2948.4844 -1854.9398,2949.132 -1854.6022,2949.7334 -1854.2135,2950.3092 -1853.8248,2950.885 -1853.3782,2951.4196 -1852.8886,2951.909 -1852.3992,2952.3985 -1851.8646,2952.8452 -1851.2888,2953.2339 -1850.7131,2953.6226 -1850.1116,2953.9602 -1849.4641,2954.2338 -1848.8164,2954.5074 -1848.1194,2954.7147 -1847.4143,2954.8587 -1846.7092,2955.0026 -1845.9876,2955.0837 -1845.2395,2955.0837 -1844.4915,2955.0837 -1843.7705,2955.0026 -1843.0647,2954.8587 -1842.359,2954.7147 -1841.6638,2954.5074 -1841.0151,2954.2338 -1840.3662,2953.9602 -1839.7425,2953.6226 -1839.1652,2953.2339 -1838.5879,2952.8452 -1838.0564,2952.3985 -1837.5654,2951.909 -1837.0743,2951.4196 -1836.6307,2950.885 -1836.2405,2950.3092 -1835.8503,2949.7334 -1835.5154,2949.132 -1835.2406,2948.4844 -1834.9658,2947.8368 -1834.7604,2947.1398 -1834.6158,2946.4347 -1834.4711,2945.7296 -1834.3907,2945.008 -1834.3907,2944.2599 -1834.3907,2943.5118 -1834.4711,2942.7909 -1834.6158,2942.0851 -1834.7604,2941.3794 -1834.9658,2940.6841 -1835.2406,2940.0354 -1835.5154,2939.3866 -1835.8503,2938.7628 -1836.2405,2938.1856 -1836.6307,2937.6083 -1837.0743,2937.0768 -1837.5654,2936.5858 -1838.0564,2936.0947 -1838.5879,2935.6511 -1839.1652,2935.2609 -1839.7425,2934.8707 -1840.3662,2934.5357 -1841.0151,2934.261 -1841.6638,2933.9862 -1842.359,2933.7808 -1843.0647,2933.6361 -1843.7705,2933.4914 -1844.4915,2933.4111 -1845.2395,2933.4111 z';
        var sortPath = 'M -1851.8839,2974.2671 C -1852.4514,2974.2671 -1852.9995,2974.3833 -1853.4906,2974.5928 -1853.9816,2974.8022 -1854.4222,2975.1091 -1854.7933,2975.4829 -1855.1642,2975.8567 -1855.4543,2976.2925 -1855.6617,2976.7856 -1855.869,2977.2787 -1855.9874,2977.8248 -1855.9874,2978.3923 -1855.9874,2978.9596 -1855.869,2979.5077 -1855.6617,2979.9989 -1855.4543,2980.4899 -1855.1642,2980.9304 -1854.7933,2981.3016 -1854.4222,2981.6726 -1853.9816,2981.9625 -1853.4906,2982.17 -1852.9995,2982.3774 -1852.4514,2982.4956 -1851.8839,2982.4956 -1851.3166,2982.4956 -1850.7684,2982.3774 -1850.2773,2982.17 -1849.7862,2981.9625 -1849.3458,2981.6726 -1848.9747,2981.3016 -1848.6036,2980.9304 -1848.3136,2980.4899 -1848.1062,2979.9989 -1847.8988,2979.5077 -1847.7806,2978.9596 -1847.7806,2978.3923 -1847.7806,2977.8248 -1847.8988,2977.2787 -1848.1062,2976.7856 -1848.3136,2976.2925 -1848.6036,2975.8567 -1848.9747,2975.4829 -1849.3458,2975.1091 -1849.7862,2974.8022 -1850.2773,2974.5928 -1850.7684,2974.3833 -1851.3166,2974.2671 -1851.8839,2974.2671 z M -1852.3075,2961.06 C -1853.0989,2961.06 -1853.8573,2961.2232 -1854.5423,2961.5143 -1855.2271,2961.8051 -1855.8416,2962.23 -1856.3591,2962.7497 -1856.8766,2963.2696 -1857.2872,2963.8799 -1857.5764,2964.5665 -1857.8657,2965.2532 -1858.0307,2966.0099 -1858.0307,2966.8014 -1858.0307,2967.5929 -1857.8657,2968.3512 -1857.5764,2969.0362 -1857.2872,2969.7211 -1856.8766,2970.3355 -1856.3591,2970.8531 -1855.8416,2971.3706 -1855.2271,2971.7812 -1854.5423,2972.0704 -1853.8573,2972.3595 -1853.0989,2972.5246 -1852.3075,2972.5246 -1851.516,2972.5246 -1850.7593,2972.3595 -1850.0727,2972.0704 -1849.386,2971.7812 -1848.7756,2971.3706 -1848.2557,2970.8531 -1847.736,2970.3355 -1847.3112,2969.7211 -1847.0202,2969.0362 -1846.7294,2968.3512 -1846.566,2967.5929 -1846.566,2966.8014 -1846.566,2966.0099 -1846.7294,2965.2532 -1847.0202,2964.5665 -1847.3112,2963.8799 -1847.736,2963.2696 -1848.2557,2962.7497 -1848.7756,2962.23 -1849.386,2961.8051 -1850.0727,2961.5143 -1850.7593,2961.2232 -1851.516,2961.06 -1852.3075,2961.06 z M -1879.9155,2941.0033 -1879.9155,2967.0833 -1887.214,2967.0833 -1874.5477,2982.5652 -1861.8812,2967.0833 -1869.4921,2967.0833 -1869.4921,2941.0033 z M -1851.6873,2940.9516 C -1852.3216,2940.9516 -1852.9333,2941.0197 -1853.5311,2941.1424 -1854.1289,2941.2651 -1854.7198,2941.4392 -1855.269,2941.6722 -1855.8179,2941.9051 -1856.3279,2942.1891 -1856.8159,2942.5199 -1857.3041,2942.8507 -1857.7573,2943.2268 -1858.1723,2943.6432 -1858.5873,2944.0594 -1858.966,2944.51 -1859.2955,2944.9995 -1859.6251,2945.4888 -1859.9113,2946.0177 -1860.1433,2946.5677 -1860.3752,2947.1177 -1860.5509,2947.7072 -1860.673,2948.3055 -1860.7951,2948.9039 -1860.8639,2949.515 -1860.8639,2950.1493 -1860.8639,2950.7835 -1860.7951,2951.3953 -1860.673,2951.9931 -1860.5509,2952.5909 -1860.3752,2953.1818 -1860.1433,2953.7308 -1859.9113,2954.2799 -1859.6251,2954.7897 -1859.2955,2955.2779 -1858.966,2955.7661 -1858.5873,2956.2193 -1858.1723,2956.6342 -1857.7573,2957.0492 -1857.3041,2957.4279 -1856.8159,2957.7575 -1856.3279,2958.087 -1855.8179,2958.3732 -1855.269,2958.6052 -1854.7198,2958.8372 -1854.1289,2959.0129 -1853.5311,2959.135 -1852.9333,2959.257 -1852.3216,2959.3257 -1851.6873,2959.3257 -1851.0532,2959.3257 -1850.4419,2959.257 -1849.8435,2959.135 -1849.2452,2959.0129 -1848.6558,2958.8372 -1848.1059,2958.6052 -1847.5557,2958.3732 -1847.0269,2958.087 -1846.5375,2957.7575 -1846.0481,2957.4279 -1845.5975,2957.0492 -1845.1812,2956.6342 -1844.7648,2956.2193 -1844.3887,2955.7661 -1844.0579,2955.2779 -1843.7271,2954.7897 -1843.4432,2954.2799 -1843.2102,2953.7308 -1842.9772,2953.1818 -1842.8031,2952.5909 -1842.6805,2951.9931 -1842.5578,2951.3953 -1842.4897,2950.7835 -1842.4897,2950.1493 -1842.4897,2949.515 -1842.5578,2948.9039 -1842.6805,2948.3055 -1842.8031,2947.7072 -1842.9772,2947.1177 -1843.2102,2946.5677 -1843.4432,2946.0177 -1843.7271,2945.4888 -1844.0579,2944.9995 -1844.3887,2944.51 -1844.7648,2944.0594 -1845.1812,2943.6432 -1845.5975,2943.2268 -1846.0481,2942.8507 -1846.5375,2942.5199 -1847.0269,2942.1891 -1847.5557,2941.9051 -1848.1059,2941.6722 -1848.6558,2941.4392 -1849.2452,2941.2651 -1849.8435,2941.1424 -1850.4419,2941.0197 -1851.0532,2940.9516 -1851.6873,2940.9516 z';

        var ascendingSortButton = new fabric.Path(sortPath, {
            originX: 'center',
            originY: 'center',
            strokeWidth: 1.5,
            stroke: this.stroke,
            fill: 'white',
            perPixelTargetFind: false,
            selectable: false,
            lockMovementX: true,
            lockMovementY: true,
            lockScalingX: true,
            lockScalingY: true,
            untransformedScaleX: 1,
            untransformedScaleY: 1,
            untransformedAngle: 0,
            parentObject: this,
            strokeLineJoin: 'round',
            opacity: 1,
            permanentOpacity: 1,
            movingOpacity: 1,
        });

        canvas.add(ascendingSortButton);
        this.ascendingSortButton = ascendingSortButton;
        this.widgets.push(ascendingSortButton);

        ascendingSortButton.on('mouseup', function () {
            var theAggregator = ascendingSortButton.parentObject;
            if (theAggregator.inConnectors.length < 2)
                return;
            if (!theAggregator.connectorsSorted(true)) {
                theAggregator.inConnectors.sort(function (connector1, connector2) {
                    return connector1.value - connector2.value;
                });
                theAggregator.gatherValues(true);
                if (!theAggregator.isCompressed) {
//                    theAggregator.repositionChildren(false, theAggregator.expandedWidth);

                    theAggregator.positionChildren();


                }
            } else {
                alertify.log("Values already sorted", "", 1000);
            }
        });


        var descendingSortButton = new fabric.Path(sortPath, {
            originX: 'center',
            originY: 'center',
            strokeWidth: 1.5,
            stroke: this.stroke,
            fill: 'white',
            perPixelTargetFind: false,
            selectable: false,
            lockMovementX: true,
            lockMovementY: true,
            lockScalingX: true,
            lockScalingY: true,
            untransformedScaleX: 1,
            untransformedScaleY: 1,
            untransformedAngle: 180,
            parentObject: this,
            strokeLineJoin: 'round',
            opacity: 1,
            permanentOpacity: 1,
            movingOpacity: 1,
            angle: 180
        });


        canvas.add(descendingSortButton);
        this.descendingSortButton = descendingSortButton;
        this.widgets.push(descendingSortButton);

        descendingSortButton.on('mouseup', function () {
            var theAggregator = descendingSortButton.parentObject;
            if (theAggregator.inConnectors.length < 2)
                return;
            if (!theAggregator.connectorsSorted(false)) {
                theAggregator.inConnectors.sort(function (connector1, connector2) {
                    return connector2.value - connector1.value;
                });
                theAggregator.gatherValues(true);
                if (!theAggregator.isCompressed) {
//                    theAggregator.repositionChildren(false, null);
                    theAggregator.positionChildren();
                }
            } else {
                alertify.log("Values already sorted", "", 1000);
            }
        });


        this.compressedHeight = 2 * (this.childrenRadius + this.verticalSeparation) + descendingSortButton.height + 2 * this.verticalSpace;
        this.set('height', options.height || this.compressedHeight);



        this.positionSortingButtons();

        setTimeout(function () {
            ascendingSortButton.parentObject.bringToFront(true);
            ascendingSortButton.bringToFront(true);
            descendingSortButton.bringToFront(true);
        }, 50);

        this.associateEvents();





        /*this.on('mouseup', function (option) {
         
         if (LOG) console.log("%cMouse UP over an AGGREGATOR", "background: lightgray; color: blue;");
         
         if (this.moving || this.scaling) {
         
         if (!this.lockMovementX && !this.lockMovementY)
         return;
         
         var theEvent = option.e;
         var canvasCoords = getCanvasCoordinates(theEvent);
         var coordX = canvasCoords.x;
         var coordY = canvasCoords.y;
         
         var targetObject = getObjectContaining(canvasCoords);
         
         if (targetObject && targetObject !== this) {
         
         if (targetObject.isPlayer || targetObject.isVisualProperty) {
         
         var lastAddedConnector = getLastElementOfArray(this.outConnectors);
         lastAddedConnector.sendBackwards(true);
         lastAddedConnector.setDestination(targetObject, true);
         
         setTimeout(function () {
         lastAddedConnector.sendToBack();
         }, 50);
         
         
         
         }
         
         //                        if (targetObject.isOutput) {
         //
         //                            var connector = getLastElementOfArray(this.outConnectors);
         //                            connector.setDestination(targetObject, true);
         //
         //                            // This output should be updated properly with this new entry
         //                        }
         //                        
         //                         
         //                          
         //                            else if (targetObject.isOperator && targetObject != this) {
         //
         //                            var connector = getLastElementOfArray(this.outConnectors);
         //                            connector.setDestination(targetObject, true);
         //
         //                        } else if (targetObject.isImage) { // This makes no sense, so, the added connector is just removed
         //                            var connector = this.outConnectors.pop();
         //                            connector.remove();                        
         //                        } else if (targetObject.isAggregator) { // This makes no sense, so, the added connector is just removed
         //                            
         //                            var connector = getLastElementOfArray(this.outConnectors);
         //                            targetObject.addConnector(connector, canvasCoords);
         //                            
         //                            
         //                        }
         
         } else {
         
         if (this.lockMovementX && this.lockMovementY) {
         
         // The mouse up event is done over a blank section of the canvas
         var lastAddedConnector = getLastElementOfArray(this.outConnectors);
         
         lastAddedConnector.value = this.value;
         
         var options = {
         left: coordX,
         top: coordY,
         fill: this.fill,
         stroke: this.colorForStroke,
         area: 6500,
         label: '' + lastAddedConnector.value
         };
         
         addOutputToCanvas(lastAddedConnector, CIRCULAR_OUTPUT, options);
         if (LOG) console.log("%c The output of this operator is: " + lastAddedConnector.value, "background: gray");
         
         setTimeout(function () {
         lastAddedConnector.sendToBack();
         }, 50);
         }
         }
         
         // In case this operator belongs to a selection
         if (this.parentObject) {
         computeUntransformedProperties(this);
         }
         
         
         } else {
         
         if (this.lockMovementX && this.lockMovementY) {
         var connector = this.outConnectors.pop();
         connector.remove();
         }
         
         }
         
         this.lockMovementX = false;
         this.lockMovementY = false;
         this.moving = false;
         this.scaling = false;
         });*/
    },
    associateEvents: function () {

        var theAggregator = this;

        theAggregator.on({
            'mouseup': function (option) {


                if (LOG) console.log("%cMouse UP over an AGGREGATOR", "background: lightgray; color: blue;");

                if (theAggregator.moving || theAggregator.scaling) {

                    if (!theAggregator.lockMovementX && !theAggregator.lockMovementY)
                        return;

                    var theEvent = option.e;
                    var canvasCoords = getCanvasCoordinates(theEvent);
                    var coordX = canvasCoords.x;
                    var coordY = canvasCoords.y;

                    var targetObject = getObjectContaining(canvasCoords);

                    if (targetObject && targetObject !== theAggregator) {

                        if (targetObject.isPlayer || targetObject.isVisualProperty) {

                            var lastAddedConnector = getLastElementOfArray(theAggregator.outConnectors);
                            lastAddedConnector.sendBackwards(true);
                            lastAddedConnector.setDestination(targetObject, true);

                            setTimeout(function () {
                                lastAddedConnector.sendToBack();
                            }, 50);



                        }


                    } else {

                        if (theAggregator.lockMovementX && theAggregator.lockMovementY) {

                            // The mouse up event is done over a blank section of the canvas
                            var lastAddedConnector = getLastElementOfArray(theAggregator.outConnectors);

                            lastAddedConnector.value = theAggregator.value;

                            var options = {
                                left: coordX,
                                top: coordY,
                                fill: theAggregator.fill,
                                stroke: this.colorForStroke,
                                area: 6500,
                                label: '' + lastAddedConnector.value
                            };

                            addOutputToCanvas(lastAddedConnector, CIRCULAR_OUTPUT, options);
                            if (LOG) console.log("%c The output of this operator is: " + lastAddedConnector.value, "background: gray");

                            setTimeout(function () {
                                lastAddedConnector.sendToBack();
                            }, 50);
                        }
                    }

                    // In case this operator belongs to a selection
                    if (theAggregator.parentObject) {
                        computeUntransformedProperties(theAggregator);
                    }


                } else {

                    if (theAggregator.lockMovementX && theAggregator.lockMovementY) {
                        var connector = theAggregator.outConnectors.pop();
                        connector.remove();
                    }

                }

                theAggregator.lockMovementX = false;
                theAggregator.lockMovementY = false;
                theAggregator.moving = false;
                theAggregator.scaling = false;


            },
            'outConnectionRemoved': function (options) {

                if (LOG) console.log("OUT CONNECTOR REMOVED IN AN AGGREGATOR");

                if (LOG) console.log("Before: ");
                if (LOG) console.log(theAggregator.outConnectors);

                var removedConnection = options.connector;
                fabric.util.removeFromArray(theAggregator.outConnectors, removedConnection);

                if (LOG) console.log("After: ");
                if (LOG) console.log(theAggregator.outConnectors);

            },
        });


    },
    connectorsSorted: function (ascending) {
        var theAggregator = this;
        var i, len;
        for (i = 0, len = theAggregator.inConnectors.length; i < len - 1; i++) {
            if (ascending) {
                if (theAggregator.inConnectors[i].value > theAggregator.inConnectors[i + 1].value) {
                    return false;
                }
            } else {
                if (theAggregator.inConnectors[i].value < theAggregator.inConnectors[i + 1].value) {
                    return false;
                }
            }
        }
        return true;
    },
    applySelectedStyle: function () {
        this.selected = true;
    },
    applyUnselectedStyle: function () {
        this.selected = false;
    },
    blink: function () {
        var increment = 0.1;
        var duration = 100;
        var easing = fabric.util.ease['easeInCubic'];

        this.animate('scaleX', '+=' + increment, {
            duration: duration,
            onChange: canvas.renderAll.bind(canvas),
            easing: easing,
            operator: this,
            onComplete: function () {
                if (LOG) console.log(this);
                if (LOG) console.log(self);
                this.operator.animate('scaleX', '-=' + increment, {
                    duration: 1100,
                    onChange: canvas.renderAll.bind(canvas),
                    easing: fabric.util.ease['easeOutElastic']
                });
            }
        });
        this.animate('scaleY', '+=' + increment, {
            duration: duration,
            onChange: canvas.renderAll.bind(canvas),
            easing: easing,
            operator: this,
            onComplete: function () {
                this.operator.animate('scaleY', '-=' + increment, {
                    duration: 1100,
                    onChange: canvas.renderAll.bind(canvas),
                    easing: fabric.util.ease['easeOutElastic']
                });
            }
        });
    },
    gatherValues: function (shouldAnimate) {
        var theAggregator = this;
        theAggregator.value = new Array();
        theAggregator.inConnectors.forEach(function (inConnector) {
            theAggregator.value.push(inConnector.value);
        });
        theAggregator.outConnectors.forEach(function (outConnector) {
            outConnector.setValue(theAggregator.value, false, shouldAnimate);
        });
    },
    addConnector: function (newInConnection, canvasCoords) {

        var theAggregator = this;
        var options = {
            left: canvasCoords.x,
            top: canvasCoords.y,
            fill: theAggregator.childrenFillColor,
            stroke: theAggregator.childrenStrokeColor,
            radius: this.childrenRadius,
            strokeWidth: this.childrenStrokeWidth,
            lockMovementX: true,
            lockMovementY: true,
            lockScalingX: true,
            lockScalingY: true,
//         evented: false,
            originX: 'center',
            originY: 'center',
            scaleX: this.getScaleX(),
            scaleY: this.getScaleY(),
            angle: this.getAngle(),
            labeled: false,
            hasBorders: false,
            hasControls: false
        };

        var circularOutput = new CircularOutput(options);
        circularOutput.addInConnector(newInConnection);
        canvas.add(circularOutput);
        circularOutput.animateBirth(false);
        newInConnection.setDestination(circularOutput, true);
        this.inConnectors.push(newInConnection);

        circularOutput.on('doubleTap', function (option) {
            theAggregator.trigger('doubleTap');
        });

        var duration = 500;
        var easing = fabric.util.ease.easeInQuart;
        var clonnedAggregator = fabric.util.object.clone(theAggregator);

        if (this.isCompressed) {

            this.expandedWidth += this.additionalWidth;

            // The following lines position the just added child to the position that all the current children 
            // have at this point, as the aggregator is compressed

            clonnedAggregator.width = this.compressedWidth;
            var realWidth = clonnedAggregator.getWidth() + (theAggregator.getScaleX() * theAggregator.strokeWidth);
            var topLeft = clonnedAggregator.getPointByOrigin('left', 'top');
            var x = topLeft.x + realWidth / 2;
            var y = topLeft.y + (theAggregator.childrenRadius + theAggregator.verticalSeparation) * theAggregator.getScaleY();
            var rotatedPosition = fabric.util.rotatePoint(new fabric.Point(x, y), topLeft, fabric.util.degreesToRadians(theAggregator.getAngle()));

            circularOutput.animate('left', rotatedPosition.x, {
                duration: duration,
                easing: easing
            });
            circularOutput.animate('top', rotatedPosition.y, {
                onChange: function () {
                    newInConnection.set({'x2': circularOutput.left, 'y2': circularOutput.top});
                },
                duration: duration,
                onComplete: function () {
                    newInConnection.set({'x2': circularOutput.left, 'y2': circularOutput.top});
                    theAggregator.addChild(circularOutput);
                },
                easing: easing
            });

        } else {

            if (LOG) console.log("Math.abs(theAggregator.additionalWidth * theAggregator.inConnectors.length - theAggregator.width): ");
            if (LOG) console.log(Math.abs(theAggregator.additionalWidth * theAggregator.inConnectors.length - theAggregator.width));

            var topLeft = theAggregator.getPointByOrigin('left', 'top');
            var realWidth = theAggregator.getWidth() + (theAggregator.getScaleX() * theAggregator.strokeWidth);

            if (theAggregator.width - theAggregator.additionalWidth * theAggregator.inConnectors.length < 10) {


                theAggregator.transitionWidth += theAggregator.additionalWidth;
                clonnedAggregator.width = theAggregator.transitionWidth;

                theAggregator.animate('width', theAggregator.transitionWidth, {
                    duration: duration,
                    easing: easing,
                    onChange: function () {
                        theAggregator.positionSortingButtons();
                    },
                    onComplete: function () {
                        theAggregator.positionSortingButtons();
                    }
                });

                topLeft = clonnedAggregator.getPointByOrigin('left', 'top');
                realWidth = clonnedAggregator.getWidth() + (theAggregator.getScaleX() * theAggregator.strokeWidth);
            }

            var positions = theAggregator.generateChildrenPositions(realWidth, topLeft);

            for (var i = 0, len = theAggregator.inConnectors.length; i < len; i++) {
                theAggregator.animateChild(i, 'top', positions[i].y, duration, easing);
                theAggregator.animateChild(i, 'left', positions[i].x, duration, easing);
            }
        }

        circularOutput.on('inConnectionRemoved', function (options) {

            var duration = 500;
            var easing = fabric.util.ease.easeInQuart;

            var removedConnection = options.connector;
            fabric.util.removeFromArray(theAggregator.inConnectors, removedConnection);

            var easing2 = fabric.util.ease.easeOutBounce;
            var duration2 = 500;
            circularOutput.animate('scaleX', 0, {
                duration: duration2,
                easing: easing2,
            });
            circularOutput.animate('scaleY', 0, {
                duration: duration2,
                easing: easing2,
                onChange: function () {
                    canvas.renderAll.bind(canvas);
                    canvas.renderAll();
                },
                onComplete: function () {
                    canvas.renderAll.bind(canvas);
                    canvas.renderAll();
                    circularOutput.remove();
                }
            });

            if (LOG) console.log("%cAfter removing this in connections, there are " + theAggregator.inConnectors.length + " incoming connectors in this agrregator.", "background: yellow; color: black;");

            var topLeft = theAggregator.getPointByOrigin('left', 'top');
            var realWidth = theAggregator.getWidth() + (theAggregator.getScaleX() * theAggregator.strokeWidth);
            var clonnedAggregator = fabric.util.object.clone(theAggregator);

            if (!theAggregator.isCompressed) {

                if (theAggregator.inConnectors.length > 1) {

                    theAggregator.transitionWidth -= theAggregator.additionalWidth;

                    clonnedAggregator.width = theAggregator.transitionWidth;
                    topLeft = clonnedAggregator.getPointByOrigin('left', 'top');

                    // reducing the width of the actual aggregator
                    theAggregator.animate('width', theAggregator.transitionWidth, {
                        duration: duration,
                        easing: easing,
                        onChange: function () {
                            theAggregator.positionSortingButtons();
                            canvas.renderAll.bind(canvas);
                            canvas.renderAll();
                        },
                        onComplete: function () {
                            theAggregator.positionSortingButtons();
                            canvas.renderAll.bind(canvas);
                            canvas.renderAll();

                        }
                    });

                }

                realWidth = clonnedAggregator.getWidth() + (theAggregator.getScaleX() * theAggregator.strokeWidth);

                var positions = theAggregator.generateChildrenPositions(realWidth, topLeft);
                for (var i = 0, len = theAggregator.inConnectors.length; i < len; i++) {
                    theAggregator.animateChild(i, 'top', positions[i].y, duration, easing);
                    theAggregator.animateChild(i, 'left', positions[i].x, duration, easing);
                }

            }

            // If an inConnection is removed when the aggregator is compressed, the width accounted for this input
            // should not be considered anymore when the aggregator is expanded back. In that sense, that additional width
            // (represented by the theAggregator.expandedWidth variable) should be removed from the expandedWidth recorded
            // before the compression
            if (theAggregator.isCompressed && theAggregator.expandedWidth) {
                theAggregator.expandedWidth -= theAggregator.additionalWidth;
            }

            theAggregator.gatherValues(true);

        });

        theAggregator.gatherValues(true);

    },
    positionSortingButtons: function () {

        var theAggregator = this;
        var horizontalSpace = 10;
        var verticalSpace = theAggregator.verticalSpace;

        theAggregator.ascendingSortButton.untransformedX = theAggregator.strokeWidth / 2 + horizontalSpace;
        theAggregator.ascendingSortButton.untransformedY = theAggregator.height - theAggregator.strokeWidth / 2 - theAggregator.ascendingSortButton.height - verticalSpace;
        repositionWidget(theAggregator, theAggregator.ascendingSortButton);

        theAggregator.descendingSortButton.untransformedX = theAggregator.width - theAggregator.strokeWidth / 2 - theAggregator.descendingSortButton.width - horizontalSpace;
        theAggregator.descendingSortButton.untransformedY = theAggregator.height - theAggregator.strokeWidth / 2 - theAggregator.descendingSortButton.height - verticalSpace;
        repositionWidget(theAggregator, theAggregator.descendingSortButton);
    },
    generateChildrenPositions: function (realWidth, topLeft) {

        var positions = new Array();
        var theAggregator = this;
        var indent = theAggregator.indent * theAggregator.getScaleX();
        var nparts = theAggregator.inConnectors.length;
        var effectiveSpace = realWidth - 2 * indent;
        var separation = effectiveSpace / nparts;

        var y = topLeft.y + (theAggregator.childrenRadius + theAggregator.verticalSeparation) * theAggregator.getScaleY();

        for (var i = 0, len = theAggregator.inConnectors.length; i < len; i++) {
            var x = topLeft.x + indent + (i + 0.5) * separation;
            positions.push(fabric.util.rotatePoint(new fabric.Point(x, y), topLeft, fabric.util.degreesToRadians(theAggregator.getAngle())));
        }



        return positions;
    },
    positionChildren: function () {

        var theAggregator = this;
        var duration = 500;
        var easing = fabric.util.ease.easeInQuart;

        var nparts = theAggregator.inConnectors.length;

        var indent = 15 * theAggregator.getScaleX();

        var realWidth = theAggregator.getWidth() + (theAggregator.getScaleX() * theAggregator.strokeWidth);

//        if (LOG) console.log("realWidth: " + realWidth);
//
//        var effectiveSpace = realWidth - 2 * indent;
//
//        if (LOG) console.log("effectiveSpace: " + effectiveSpace);
//
//        var separation = effectiveSpace / nparts;
//
//        if (LOG) console.log("separation: " + separation);
//
        var topLeft = theAggregator.getPointByOrigin('left', 'top');
////        drawRectAt(topLeft, "black");
//
////        topLeft.x = topLeft.x + (theAggregator.getScaleX()*theAggregator.strokeWidth)/2;
//
//        var y = topLeft.y + (theAggregator.childrenRadius + theAggregator.verticalSeparation) * theAggregator.getScaleY();
//
//        drawRectAt(topLeft, "purple");
//
//        for (var i = 0, len = theAggregator.inConnectors.length; i < len; i++) {
//
//            var x = topLeft.x + indent + (i + 0.5) * separation;
//
//            drawRectAt(new fabric.Point(x, y), "yellow");
//
//            var rotatedPosition = fabric.util.rotatePoint(new fabric.Point(x, y), topLeft, fabric.util.degreesToRadians(theAggregator.getAngle()));
//
//            drawRectAt(rotatedPosition, "red");
//
//            theAggregator.animateChild(i, 'top', rotatedPosition.y, duration, easing);
//            theAggregator.animateChild(i, 'left', rotatedPosition.x, duration, easing);
//        }


        var positions = theAggregator.generateChildrenPositions(realWidth, topLeft);
        for (var i = 0, len = theAggregator.inConnectors.length; i < len; i++) {
            theAggregator.animateChild(i, 'top', positions[i].y, duration, easing);
            theAggregator.animateChild(i, 'left', positions[i].x, duration, easing);
        }



    },
    repositionChildren: function (afterInConecctionRemoval, targetWidth) {

        var theAggregator = this;
        var duration = 500;
        var easing = fabric.util.ease.easeInQuart;

        var nparts = 1 + theAggregator.inConnectors.length;

        var realWidth = theAggregator.getWidth() + (theAggregator.getScaleX() * theAggregator.strokeWidth);
        if (targetWidth) {
            realWidth = (targetWidth + theAggregator.strokeWidth) * theAggregator.getScaleX();
        }

        if (afterInConecctionRemoval && theAggregator.inConnectors.length > 1) {
            realWidth -= theAggregator.additionalWidth * theAggregator.getScaleX();
            targetWidth = realWidth;
        }

//        if (LOG) console.log("%c realWidth: " + realWidth, "background: yellow; color: black;");

        var realChildWidth = (2 * theAggregator.childrenRadius + theAggregator.childrenStrokeWidth) * theAggregator.getScaleX();

        var gap = (realWidth - (theAggregator.inConnectors.length * realChildWidth)) / nparts;

//        if (LOG) console.log("%c realChildWidth: " + realChildWidth, "background: yellow; color: black;");
//        if (LOG) console.log("%c theAggregator.getWidth(): " + theAggregator.getWidth(), "background: yellow; color: black;");
//        if (LOG) console.log("%c theAggregator.strokeWidth: " + theAggregator.strokeWidth, "background: yellow; color: black;");
//        if (LOG) console.log("%c theAggregator.getScaleX(): " + theAggregator.getScaleX(), "background: yellow; color: black;");
//        if (LOG) console.log("%c gap: " + gap, "background: yellow; color: black;");

        var topLeft = theAggregator.getPointByOrigin('left', 'top');
        if (targetWidth) {
            var clonnedAggregator = fabric.util.object.clone(theAggregator);
            clonnedAggregator.width = targetWidth;
            topLeft = clonnedAggregator.getPointByOrigin('left', 'top');
        }


        if (!afterInConecctionRemoval && !targetWidth) {

            if (gap < 12.5 * theAggregator.getScaleX()) {

                // Using this cloned version of the aggregator to retrieve the position of the top left point once the aggregator has grown in width
                var clonnedAggregator = fabric.util.object.clone(theAggregator);
                clonnedAggregator.width = theAggregator.width + theAggregator.additionalWidth;
                topLeft = clonnedAggregator.getPointByOrigin('left', 'top');

                realWidth = clonnedAggregator.getWidth() + (theAggregator.getScaleX() * theAggregator.strokeWidth);
                gap = (realWidth - (theAggregator.inConnectors.length * realChildWidth)) / nparts;

//                if (LOG) console.log("%c NEW gap: " + gap, "background: yellow; color: black;");

                theAggregator.transitionWidth = theAggregator.width + theAggregator.additionalWidth;

                // growing the actual aggregator
                this.animate('width', theAggregator.transitionWidth, {
                    duration: duration,
                    easing: easing,
                    onChange: function () {
                        theAggregator.positionSortingButtons();
                    },
                    onComplete: function () {
                        theAggregator.positionSortingButtons();
                    }
                });
            }
        }

        var positions = theAggregator.generateChildrenPositions(realWidth, topLeft);
        for (var i = 0, len = theAggregator.inConnectors.length; i < len; i++) {
            theAggregator.animateChild(i, 'top', positions[i].y, duration, easing);
            theAggregator.animateChild(i, 'left', positions[i].x, duration, easing);
        }

    },
    addChild: function (child) {

        this.widgets.push(child);

        var objectTopLeft = child.getPointByOrigin('left', 'top');
//        
//        
//        
//        var rotatedObjectTopLeft = fabric.util.rotatePoint(new fabric.Point(objectTopLeft.x, objectTopLeft.y), topLeft, -fabric.util.degreesToRadians(this.getAngle()));
//        
//        drawRectAt(topLeft, "red");
//        drawRectAt(objectTopLeft, "blue");
////        drawRectAt(rotatedObjectTopLeft, "green");
//        
//        
//        if (LOG) console.log("this.getScaleX():");
//        if (LOG) console.log(this.getScaleX());
//        
//        if (LOG) console.log("this.getScaleY():");
//        if (LOG) console.log(this.getScaleY());
//
//        // Computing the untransformed properties of each contained object                
        child.parentObject = this;
        child.untransformedScaleX = 1;
        child.untransformedScaleY = 1;
        child.untransformedAngle = 0;

        if (LOG) console.log("%c object.untransformedAngle: " + child.untransformedAngle, "background: blue; color: white;");


//        object.untransformedX = (objectTopLeft.x - topLeft.x - this.strokeWidth/2 + object.strokeWidth/2) / this.getScaleX();
//        object.untransformedY = (objectTopLeft.y - topLeft.y - this.strokeWidth/2 + object.strokeWidth/2) / this.getScaleY();


//
//      var untransformedX = (objectTopLeft.x - topLeft.x - this.strokeWidth / 2 + object.strokeWidth / 2) / this.getScaleX();
//      var untransformedY = (objectTopLeft.y - topLeft.y - this.strokeWidth / 2 + object.strokeWidth / 2) / this.getScaleY();
//      if (LOG) console.log("%c untransformedX: " + untransformedX, "background: blue; color: white;");
//      if (LOG) console.log("%c untransformedY: " + untransformedY, "background: blue; color: white;");



        computeUntransformedProperties(child);



//        if (LOG) console.log(object.untransformedScaleX);
//        if (LOG) console.log("%c object.untransformedX: " + object.untransformedX, "background: blue; color: yellow;");
//        if (LOG) console.log("%c object.untransformedY: " + object.untransformedY, "background: blue; color: yellow;");



        child.added = true;

    },
    animateChild: function (i, prop, endValue, duration, easing) {
        var theAggregator = this;
        var inConnector = theAggregator.inConnectors[i];
        var child = inConnector.destination;
        fabric.util.animate({
            startValue: child[prop],
            endValue: endValue,
            duration: duration,
            easing: easing,
            onChange: function (value) {
                child[prop] = value;
                inConnector.set({'x2': child.left, 'y2': child.top});
                // only render once
                if (i === theAggregator.inConnectors.length - 1 && prop === 'left') {
                    canvas.renderAll();
                }
            },
            onComplete: function () {
                inConnector.set({'x2': child.left, 'y2': child.top});
                child.setCoords();
//            child.evented = false;
                child.lockMovementX = true;
                child.lockMovementY = true;
                child.lockScalingX = true;
                child.lockScalingY = true;
//                child.selectable = false;

                if (!child.added) {
                    theAggregator.addChild(child);
                }

                computeUntransformedProperties(child);

                if (i === theAggregator.inConnectors.length - 1 && prop === 'left') {
                    canvas.renderAll();
                }
            }
        });
    },
    compress: function () {

        if (this.inConnectors.length <= 1) {
            return;
        }

        var theAggregator = this;
        var duration = 500;
        var easing = fabric.util.ease.easeInBack;

        // saving the current width of the aggregator
        theAggregator.expandedWidth = this.width;

        theAggregator.transitionWidth = this.compressedWidth;

        theAggregator.animate('width', theAggregator.transitionWidth, {
            onChange: function () {
                theAggregator.positionSortingButtons();
            },
            duration: duration,
            onComplete: function () {
                theAggregator.positionSortingButtons();
                theAggregator.isCompressed = true;
            },
            easing: easing
        });

        duration = 500;
        var clonnedAggregator = fabric.util.object.clone(theAggregator);
        clonnedAggregator.width = this.compressedWidth;
        var realWidth = clonnedAggregator.getWidth() + (theAggregator.getScaleX() * theAggregator.strokeWidth);
        var topLeft = clonnedAggregator.getPointByOrigin('left', 'top');
        var x = topLeft.x + realWidth / 2;
        var y = topLeft.y + (theAggregator.childrenRadius + theAggregator.verticalSeparation) * theAggregator.getScaleY();
        var rotatedPosition = fabric.util.rotatePoint(new fabric.Point(x, y), topLeft, fabric.util.degreesToRadians(theAggregator.getAngle()));

        for (var i = 0, len = theAggregator.inConnectors.length; i < len; i++) {
            theAggregator.animateChild(i, 'top', rotatedPosition.y, duration, easing);
            theAggregator.animateChild(i, 'left', rotatedPosition.x, duration, easing);
        }
    },
    expand: function () {

        if (this.inConnectors.length <= 1) {
            return;
        }

        var theAggregator = this;
        var duration = 500;
        var easing = fabric.util.ease.easeInBack;

        if (LOG) console.log("%c theAggregator.expandedWidth: " + theAggregator.expandedWidth, "background: yellow; color: black;");

        theAggregator.transitionWidth = theAggregator.expandedWidth;

        theAggregator.animate('width', theAggregator.transitionWidth, {
            onChange: function () {
                theAggregator.positionSortingButtons();
            },
            duration: duration,
            onComplete: function () {
                theAggregator.positionSortingButtons();
                theAggregator.isCompressed = false;
            },
            easing: easing
        });

        theAggregator.repositionChildren(false, theAggregator.expandedWidth);

        theAggregator.inConnectors.forEach(function (inConnector) {
            var child = inConnector.destination;
//            child.evented = true;
//            child.lockMovementX = false;
//            child.lockMovementY = false;
//            child.lockScalingX = false;
//            child.lockScalingY = false;
//         child.selectable = true;
        });
    },
    toObject: function () {
        return fabric.util.object.extend(this.callSuper('toObject'), {
            label: this.get('label')
        });
    },
    _render: function (ctx, noTransform) {



        var rx = this.rx ? Math.min(this.rx, this.width / 2) : 0,
                ry = this.ry ? Math.min(this.ry, this.height / 2) : 0,
                w = this.width,
                h = this.height,
                x = -w / 2,
                y = -h / 2,
                isInPathGroup = this.group && this.group.type === 'path-group',
                isRounded = rx !== 0 || ry !== 0,
                k = 1 - 0.5522847498 /* "magic number" for bezier approximations of arcs (http://itc.ktu.lt/itc354/Riskus354.pdf) */;

        ctx.beginPath();
        ctx.globalAlpha = isInPathGroup ? (ctx.globalAlpha * this.opacity) : this.opacity;

        if (this.transformMatrix && isInPathGroup) {
            ctx.translate(
                    this.width / 2 + this.x,
                    this.height / 2 + this.y);
        }
        if (!this.transformMatrix && isInPathGroup) {
            ctx.translate(
                    -this.group.width / 2 + this.width / 2 + this.x,
                    -this.group.height / 2 + this.height / 2 + this.y);
        }

        ctx.moveTo(x + rx, y);

        ctx.lineTo(x + w - rx, y);
        isRounded && ctx.bezierCurveTo(x + w - k * rx, y, x + w, y + k * ry, x + w, y + ry);

        ctx.lineTo(x + w, y + h);

        ctx.lineTo(x, y + h);

        ctx.lineTo(x, y + ry);
        isRounded && ctx.bezierCurveTo(x, y + k * ry, x + k * rx, y, x + rx, y);

        ctx.closePath();

        this._renderFill(ctx);

        if (this.selected) {
            this.stroke = widget_selected_stroke_color;
            this.strokeWidth = widget_selected_stroke_width;
            this.strokeDashArray = widget_selected_stroke_dash_array;
        } else {
            this.stroke = aggregatorStrokeColor;
            this.strokeWidth = aggregatorStrokeWidth;
            this.strokeDashArray = [];
        }

        this._renderStroke(ctx);

        var a = -this.height / 2 + 2 * (this.childrenRadius + this.verticalSeparation) - this.strokeWidth;

        ctx.save();
        ctx.strokeStyle = aggregatorStrokeColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-this.width / 2 + 3, a);
        ctx.lineTo(this.width / 2 - 3, a);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();




    }
});