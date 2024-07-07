document.addEventListener("DOMContentLoaded", function() {
    // Schedule form handler
    document.getElementById("schedule-form").addEventListener("submit", function(e) {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const username = email.split('@')[0]; // Generate username from email

        alert("Interview scheduled successfully!");

        // Save the username and proceed to start the call
        startCall(username);
    });

    // WebRTC setup for video call
    let localStream;
    const localVideo = document.getElementById("local-video");
    const remoteVideo = document.getElementById("remote-video");
    const endCallBtn = document.getElementById("end-call");

    async function startCall(username) {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideo.srcObject = localStream;

        const peerConnection = new RTCPeerConnection();
        localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

        peerConnection.ontrack = event => {
            remoteVideo.srcObject = event.streams[0];
        };

        peerConnection.onicecandidate = event => {
            if (event.candidate) {
                // Send the candidate to the remote peer
                console.log('New ICE candidate:', event.candidate);
            }
        };

        // Example SDP exchange
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        console.log('Offer:', offer);

        // Simulating the remote answer (for demo purposes)
        const answer = await peerConnection.createAnswer();
        await peerConnection.setRemoteDescription(answer);
        console.log('Answer:', answer);
    }

    endCallBtn.addEventListener("click", function() {
        localStream.getTracks().forEach(track => track.stop());
        alert("Call ended.");
    });

    // Feedback form handler
    document.getElementById("feedback-form").addEventListener("submit", function(e) {
        e.preventDefault();
        alert("Feedback submitted successfully!");
    });
});