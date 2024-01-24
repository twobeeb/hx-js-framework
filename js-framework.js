document.addEventListener('DOMContentLoaded', function(event) {
    htmx.defineExtension('js-framework', {
      init: function() {
        this.createProgressBar();
        this.injectStyles();
      },

      createProgressBar: function() {
        var progressBarWrapper = document.createElement('div');
        progressBarWrapper.id = 'framework-progress-bar';
        progressBarWrapper.className = 'framework-progress-bar-wrapper hidden';
        progressBarWrapper.innerHTML = `
          <div class="framework-progress-bar">
            <div class="framework-progress"></div>
            <span class="framework-progress-stage-text">Initializing...</span>
          </div>
        `;
        document.body.appendChild(progressBarWrapper);
      },
       injectStyles: function() {
          var style = document.createElement('style');
          style.textContent = `
            .framework-progress-bar-wrapper {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              background: rgba(0, 0, 0, 0.5);
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 1000;
            }

            .framework-progress-bar {
              width: 80%;
              padding: 10px;
              background-color: #fff;
              border: 1px solid #ccc;
              border-radius: 5px;
              position: relative;
            }

            .framework-progress {
              height: 30px;
              background-color: #4caf50;
              border-radius: 5px;
              transition: width 0.1s ease-in-out;
              width: 0%; /* Initial width is 0 */
            }

            .framework-progress-stage-text {
              position: absolute;
              width: 100%;
              text-align: center;
              top: 10px;
              color: #333;
            }

            .hidden {
              display: none;
            }
          `;
          document.head.appendChild(style);
      },

      onEvent: function(name, evt) {
        if(name === 'htmx:beforeRequest') {
          this.showProgressBar();
        }
      },

      stages: [
      "Initialize state for data, loading, and error.",
      "Use useEffect to trigger the HTTP request on component mount.",
      "Set loading state to true before sending the request.",
      "Collect the inputs and serialize to JSON",
      "Use fetch (or Axios) to make the HTTP request.",
      "Handle the HTTP response, parse the JSON.",
      "Update the state with the fetched data.",
      "Set loading state to false after the request completes.",
      "Render the UI based on the current state.",
      "Update the UI when the state changes."],

     showProgressBar: function() {
       var progressBarWrapper = document.getElementById('framework-progress-bar');
       var progressBar = progressBarWrapper.querySelector('.framework-progress');
       var progressText = progressBarWrapper.querySelector('.framework-progress-stage-text');
       progressBarWrapper.classList.remove('hidden');
       progressBar.style.width = '0%';
       var currentStage = 0;

       var updateProgress = function() {
         if (currentStage < this.stages.length) {
           var stagePercentage = ((currentStage + 1) / this.stages.length) * 100;
           progressBar.style.width = stagePercentage + '%';
           progressText.textContent = this.stages[currentStage];
           currentStage++;
           setTimeout(updateProgress, 100); // Simulating time taken per stage
         } else {
           progressBarWrapper.classList.add('hidden'); // Hide after completion
         }
       }.bind(this);

       setTimeout(updateProgress, 100); // Initiate the first stage
     }
    }).init(); // Initialize your extension after the DOM is ready
});