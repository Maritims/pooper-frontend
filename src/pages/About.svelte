<script lang="ts">
    import Gallery from '../components/Gallery.svelte';
    import { colorThemeStore } from '../components/loaders/ColorThemeButton';
</script>

<div class="container">
    <div class="row">
        <div class="col text-center">
            <img src="/gfx/pooper_{$colorThemeStore?.toLowerCase()}_mode.png" alt="logo" class="img-fluid" style="height:300px" />
        </div>
    </div>
    <div class="row mt-3">
        <div class="col">
            <h2>Track potty time, feeding time, tooth brushing, vitamin suppplements and more. Look at graphs and statistics to spot trends and patterns in your dogs' activities.</h2>
        </div>
    </div>
    <div class="row mt-3">
        <div class="col-xs-12 col-md-8">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">What is it?</h5>
                    <p class="card-text">
                        Pooper is a progressive web application written in Svelte with a FastAPI backend. It offers functionality for tracking your dogs' activities such as potty time, feeding time, tooth brushing and other activities.
                        <br /><br />
                        The application offers a total overview over all recorded activities, a statistics views with graphs and calculations to show averages across all animals and event types.
                        <br /><br />
                        Activate and deactivate which animals to track if you only have dogs part time, or if you sometimes look after your friends' or families' dogs.
                    </p>

                    <h5 class="card-title">Why is it?</h5>
                    <p class="card-text">
                        When we got our first puppy a couple of years ago it took me a while to figure out what to look for with regards to when it was potty time and when it was feeding time.
                        My partner however having years of experience with dogs knew precisely when our puppy needed anything, and she could always tell based on some sign which to me was entirely invisible.
                        It seemed like magic.
                        <br /><br />
                        Since I'm a software developer I figured I could use technology to help me keep track of when our puppy needed something, preferably before I had to go get the bucket and mop.
                        <br /><br />
                        I started developing Pooper two years ago and it didn't really help me figure out anything, but it does help us keep track of what our dogs do, when they do it and where they do it.
                        <br /><br />
                        We don't really use the data for anything, but it's fun to calculate averages, find patterns and visualize the geographical data on maps.
                        Right now this is just a fun nerdy project we use at home, but maybe it'll become something useful at some point. Who knows?
                    </p>

                    <h5 class="card-title">Can I try it somehow?</h5>
                    <p class="card-text">
                        Yes! Pooper is open source and you can get it on Github. Check out the <a href="https://github.com/maritims/pooper-frontend">frontend</a> and <a href="https://github.com/maritims/pooper-api">API</a> repositories.
                        <br /><br />
                        I've developed Pooper to be run in a Docker environment, so it should be pretty quick for you to get up and running. If you have any trouble just open an issue and I'll have a look.
                    </p>
                </div>
            </div>
        </div>
        <div class="col-xs-12 col-md-4">
            <Gallery images={[
                {
                    filePath: '/gfx/screenshots/pooper_home.png',
                    title: 'Screenshot of home screen on desktop'
                }, {
                    filePath: '/gfx/screenshots/pooper_animals.png',
                    title: 'Screenshot of animals list on desktop'
                }, {
                    filePath: '/gfx/screenshots/pooper_events.png',
                    title: 'Screenshot of events list on desktop'
                }, {
                    filePath: '/gfx/screenshots/pooper_statistics.png',
                    title: 'Screenshot of statistics page on desktop'
                }
            ]} />
        </div>
    </div>
</div>