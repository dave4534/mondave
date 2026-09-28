The full transcript of the video **"Design.md: How to make your design system work with AI"** is provided below for your reference:

0:00 Design.md is everywhere right now. You
0:02 drop one in and your site looks on brand
0:04 in seconds, right? A lot of what you see
0:06 out there today is this version. It's
0:08 pulled from a website. But I want to
0:10 take the designd deeper. I want it to go
0:13 into the product. It should still stay
0:16 lightweight and high level. But what
0:18 changes is the coverage. I want to make
0:20 sure that it is pointing to the
0:22 components, the rules, the edge cases,
0:24 and making sure that all of that is
0:25 defined and easy to reference. So the AI
0:28 builds with them in mind and doesn't
0:30 hallucinate. This video is for the whole
0:32 product team. Design engineers, PMs,
0:34 founders. We're going to build a designd
0:36 for a real product. It points the AI to
0:39 where all the complexity lives. The
0:40 components, the rules, the metadata. All
0:43 of that's going to be defined in a very
0:44 lightweight version. Let's get started.
0:46 Let's talk a little bit about what a
0:48 design.md file is. I'm going to share my
0:51 screen. So the specs for designd they
0:54 came from Google Google stitch and it's
0:57 basically just a file format. It says yl
1:01 front matter contains machine readable
1:04 design tokens and then markdown body at
1:06 the end. Basically what it's saying is
1:09 that the first part of a designd
1:12 is just definitions like this. It's
1:15 going to have the name, the colors, the
1:16 specs, all of the details here.
1:20 And then at the end of the document,
1:22 it's going to actually write it out more
1:25 like this is how you use the typography,
1:28 this is how you use the design tokens,
1:29 this is how you define it more in
1:31 English. So it's giving you all the
1:33 detailed specs and then it's writing it
1:35 out more as like a definition of sorts.
1:38 And this has become really useful
1:40 because when you plug this into your
1:42 document and it fully understands the
1:44 branding, the components, the imagery,
1:46 the spacing, then it's going to read
1:49 this file every time you design
1:50 something and it's going to make sure
1:52 it's really following these guidelines
1:54 so that AI isn't just hallucinating
1:55 making up design decisions that aren't
1:58 being made. This has been really useful
1:59 in my projects. Um, so I'm going to
2:02 start by showing us how to actually
2:04 create a designd in our product. So, I
2:06 want to take the designd one step
2:08 further. A designd does have all of your
2:11 branding guidelines. It's great. Um, but
2:13 where I see it start to break a little
2:15 bit is when you're building a really
2:17 complex product or just you have a lot
2:19 of components and a lot of styling and
2:22 many specifications
2:23 is that it feels very surface level and
2:26 it should it should be very lightweight.
2:28 But what I want to do is I want to I
2:31 want to connect it more easily to your
2:35 component library, your story book, so
2:37 that it just has, hey, this is the
2:40 component and then it says reference
2:42 this file to go deeper. So this means
2:45 that all of the work that you've been
2:46 doing on your component library and
2:49 figuring out how to create a component
2:51 library that really speaks to AI, you're
2:53 just going to make sure that your
2:54 designd is clearly communicating with AI
2:57 how to get to that next deeper level
3:00 that you've started to create. So first,
3:03 like I said, let's jump into the design
3:05 and d. So there is a skill that Google
3:08 labs created. I'll share the link below
3:11 and it basically is defining exactly
3:13 what we talked about how um a designd
3:17 should work. So there's a few ways to
3:19 use it. Um it also says you can compare
3:21 your current one with the standard. Um
3:23 and it also tells you right down here
3:25 how you can install for CLI reference.
3:28 So what you're going to do is you're
3:29 going to go into CLI and here let's
3:32 start up Claude. I'm going to be using
3:33 cal.com as my example. It's an open
3:35 source platform. It's what I've been
3:36 using for a lot of these videos. So,
3:38 let's go ahead and paste the
3:41 instructions to install. It's basically
3:44 telling me here that cloud MD flags
3:46 adding new dependencies doesn't ask for.
3:48 So, it's asking me um there's a couple
3:50 ways you can do it. You can do a global
3:52 CI CLI, which means anytime you're in
3:54 any project, it'll work. Um, I'm just
3:57 going to do it just for this one right
3:58 now. So, it's just going to be for this
4:00 one project. Okay. So, it basically it's
4:03 giving you four options of how you can
4:05 use this. You can validate a design.md
4:09 for structural correctness. So if you
4:10 already have one, you can compare to,
4:13 you can convert into a design MD into
4:16 tokens, which is very cool. Or a spec.
4:19 We want a spec, right?
4:23 And it's telling me right here. Um, and
4:25 you can see here it's literally saying
4:26 you're in the branch designd. I created
4:28 this branch so I could work on it here.
4:30 Um, do you want to run a spec? So we do.
4:32 Yes, I want to run a spec. I want you to
4:35 look into all of the components, all of
4:37 the design, all of the tailwind, all of
4:40 the CSS, and I want you to build this
4:42 design.md file based on all of the
4:45 branding from this repo. So, it's gone
4:49 and found the design tokens in the
4:51 package theme. It's going to read them.
4:54 Okay, so you can see it's here. It says
4:56 it's done everything. The designd
4:58 requires colors as hex. Okay, so this is
5:01 interesting because a lot of the times
5:02 we want to make sure we're building
5:03 tokens. This is just a way to make sure
5:05 that everything is defined very clearly.
5:08 Um it's the the Google way which
5:10 sometimes I push back on but it seems to
5:12 be working. So I just follow the
5:13 guidelines where it says it's just going
5:14 to pull all the hex colors. Great. So
5:16 it's written it which we'll read in a
5:18 second. But what's great is it's now
5:20 using its other command lint to actually
5:22 go through and see if there's any errors
5:24 or any inconsistencies.
5:26 So it's just checking itself. Okay.
5:28 Okay, so it found a couple of changes it
5:30 needs to make. Perfect. Instead of
5:32 saying 2XL, it should be saying XXL.
5:33 That makes sense. It'll update. Perfect.
5:35 So it won't happen again. Okay, so it
5:37 looks like it's done. Created the spec.
5:39 We're going to look for spec.md. Hey, it
5:41 mind. I like that it us actual branding
5:44 from the repo converted accurately and
5:46 wrote and validated. There are 28
5:48 colors. There are 10 typography levels.
5:51 It doesn't define how many shapes. It's
5:53 defining the elevation, the components,
5:55 and the layout.
5:58 Okay. And then it checked itself. So
6:00 then it told me what it did to fix the
6:02 changes that it made. You're on the MD
6:04 range. Okay. So now let's go take a look
6:07 at what it's done. So here's my designd.
6:15 Okay.
6:17 Just going to put in preview.
6:19 So this is what it has done. It has
6:21 defined the brand colors, the neutral,
6:23 the text orders. This is all just
6:28 exactly what it said. It's just going to
6:29 define everything here. Data
6:31 visualization,
6:34 okay? How it uses that visualization,
6:38 all of the fonts, and then it has the
6:40 components here. So, we're going to come
6:43 back to this in a minute. Um,
6:47 and then at the end, remember we talked
6:49 about now it's just defining in words.c
6:51 It's cal.com is an open source
6:53 scheduling feels calm, trustworthy,
6:55 precise. So, it's just pulling the
6:57 feeling of it. And then here's the
6:59 description. This is how it's defining
7:01 colors,
7:03 how it uses them. So, this is really for
7:05 the AI to understand, hey, this is the
7:07 name of it. This is how we define it.
7:09 Um, this is borders semantic
7:13 for all of the colors. And then source
7:16 of truth tokens are defined on HSA HSLA
7:20 CSS custom properties right so cal bigig
7:23 this is what we're talking about with
7:24 those tokens and semantics here we have
7:27 a dark mode and then it's going into
7:28 details about about the typography
7:31 um weight 600 only. So see it's really
7:34 defining exactly how you should be using
7:37 these fonts. It's not leaving anything
7:39 up to interpretation. Um, I definitely
7:42 suggest reading this more in detail and
7:44 going back and forth because sometimes
7:46 it might not pick everything up that it
7:48 needs to. Um, and it's also like if it
7:50 keeps making mistakes, you can go back
7:52 and say, "Hey, update the designd based
7:54 on so it doesn't make this mistake
7:55 again." The scale used to tailwind's
7:58 default steps. Okay. And then the
8:00 layout, it's built on a strict four
8:03 pixel spacing. I love when it uses these
8:05 words like it's really concrete. This is
8:07 strict.
8:11 Okay, depth is conveyed in two ways,
8:13 tonal and tactical. It's going to define
8:16 examples of each. Then all of the shapes
8:20 and then here are the buttons.
8:22 Um, so this is actually pulling from the
8:27 component library that we built already.
8:29 You guys, I'm simplifying. I'm just
8:31 showing you a button for right now, but
8:32 basically you should be building a very
8:34 detailed design system. I suggest using
8:37 Storybook. I'm going to link to a video.
8:39 I'm going to walk you through how to
8:40 actually create your components, whether
8:42 you're bringing them in from Figma or
8:44 another tool. It's going to be able to
8:45 get all of your components in one place
8:48 documented. And then it's also going to
8:51 tell you more in detail how to do this
8:54 thing called metadata. So a metadata is
8:56 basically for each component you're very
8:59 very detailed in describing how it's
9:02 used the different sizes you can use it
9:05 the variance that you can use with the
9:07 relationship you can use a button in a
9:09 footer or a button when you use a button
9:12 you should always click it's very very
9:14 detailed um and this is just to leave no
9:18 questions up to AI to figure out so you
9:22 can see um like the key words, AI hints.
9:25 This is how you use all of this
9:27 information. And then there's anti
9:29 patterns. You should never use two
9:30 default buttons next to each other. Um,
9:33 and this is something you can keep
9:34 building upon. And again, I'll link to
9:36 that YouTube in the description. But
9:39 what I my next level of going deeper on
9:42 the designd is the designd should be
9:44 lightweight, but it should also say,
9:46 hey, if you want to see more about the
9:49 metadata of the component, go here. So,
9:51 that's what I want to include as a next
9:53 step, which I'm going to show you in a
9:55 second, is I want to make sure that
9:56 we're not going deeper here, but we're
9:58 giving the ability for the design MD to
10:01 know where to look when they want to go
10:03 deeper. Okay? And then you'll see here
10:05 after it talks through the components
10:07 with more detail, you see here, this one
10:09 is more detailed because this is where
10:11 we really went into detail. And here is
10:12 where we need to keep improving the
10:14 detail here. And then there's dos and
10:16 don'ts. So this is one of the most
10:18 important parts of AI is you don't want
10:20 it to go and make up ideas. So you're
10:22 very clear about when not to do things.
10:24 Do use their brand colors. Don't
10:26 introduce new hues. Do keep all spacing.
10:29 Do use calands. Don't use more than two
10:32 font weights in a single region. Um read
10:35 this and again as you go through your
10:37 product you might identify other places
10:38 where I makes up makes up things and
10:40 then you can go and fix them here. So
10:42 this is a designd. It's going to be in
10:45 like we said like I showed you kind of
10:47 when I open the folder.
10:51 It is going to live as a design and D
10:55 and you also can go in and you can open
10:57 your agents
11:00 or your claw and D. And you want to make
11:03 sure
11:07 here let's actually ask I want to make
11:10 sure that in my claw.mmd and my
11:11 agents.md it says anytime it's creating
11:14 any UI to reference the designd file. So
11:19 this is really important because the
11:20 first thing you're going to do is the AI
11:22 is going to look at the claw.md um and
11:25 then the agents. So if this isn't clawed
11:27 it's going to look into the agents file
11:29 which means if you're using codecs or
11:30 something. So you want to make sure that
11:32 both of these MDs at the very front are
11:34 clearly communicating if you're doing
11:36 any kind of design updates to reference
11:38 the design MD. Yeah. So it's basically
11:40 they're just mirrors of each other. The
11:42 CDOMd or the agentd.
11:46 Okay. So it's going to add this rule.
11:48 This is really important. Do not forget
11:49 this step. When creating or modifying
11:52 any UI, read and follow design.
11:57 Perfect. Okay. So it's added in a couple
11:59 places.
12:00 Wonderful. Okay.
12:03 So, now let's just go and let's um tell
12:07 Claude to add where to actually look for
12:11 more information on the button
12:13 component. We're going to start here. If
12:15 you look deeper into the component
12:17 button, you'll see that there is a
12:19 metadata.ts
12:20 file. I want to make sure that the
12:24 design d file is referencing the
12:27 metadata so that when it needs to go
12:30 deeper into understands all the dos and
12:31 don'ts and the details for that specific
12:34 component that it just knows exactly
12:36 where to go. So I do not want to add it
12:37 to the designd. I want it to reference
12:41 it so that it opens that file when it's
12:43 ready to actually create a component. So
12:46 this is this can be detailed, right?
12:47 Especially it's it's a lot of work
12:49 especially if you're building and you
12:51 have a ton of components and you need to
12:52 build all these agentic ways of
12:54 communicating with components. If you
12:56 have a really really large repo if
12:58 there's many different parts of the
12:59 project that you're working on. So one
13:01 thing I'm doing is I am offering
13:03 workshops. Um so it's a paid workshop. I
13:05 go in and I basically understand where
13:08 your current design to code process is,
13:11 where it's breaking and solutions that I
13:13 can give your team so that they actually
13:15 know how to handle this complication and
13:18 to actually build a process that makes
13:19 sense for you and your team. I also am
13:22 helping design teams build this agentic
13:25 design system as well. So there's a link
13:27 in the description if you're curious to
13:28 learn a little bit more about the
13:30 offerings. Okay, so this is what it's
13:32 done. Backy per component deep
13:35 reference. This section is the system
13:37 level summary. It intentionally does not
13:39 restate every component's full contract.
13:41 When you are ready to actually build,
13:43 compose or modify, open the metadata
13:45 file first.
13:47 Okay. So then it gives an example. Okay.
13:50 Um I actually have done it a little
13:52 different before, but I don't mind this
13:53 version of it. Okay. I think this is
13:55 okay. But also as I continue to build my
13:58 con my designd I want to make sure that
14:01 where I have details about the button
14:03 component I want to say reference and
14:06 then give it the link the metadata to
14:09 get deeper and understand more about
14:11 this component. So I want you to add it
14:14 to that specific component as well.
14:17 Okay. So I'm gonna have it save and this
14:18 let's go see actually what it looks like
14:20 in the actual MD file. Okay. So what
14:23 it's done here actually we can look at
14:25 the top components per component deep
14:27 reference the system is system level. So
14:30 it's basically exactly what we said. So
14:32 it's telling it to go into each meta.ts
14:35 and the example is here is the detail of
14:37 button and then it says reference open
14:40 this before building or composing a
14:41 button to the full contract. I love
14:44 this. Um I could probably make it a
14:46 little smaller less like lighter weight.
14:48 This is what I would do if you want to
14:50 take your design down indeed to the next
14:52 level so that it really is building your
14:54 component library, your design system,
14:56 everything wrapped in one. So when you
14:58 are prompting and creating new designs,
15:00 new features, your whole team, not just
15:02 designers, but PMs, founders, anyone on
15:05 the team can go in and they can actually
15:07 spin up the designs that they're looking
15:09 for that are going to be very close to
15:12 pixel perfect because we are documenting
15:15 everything for the AI to never
15:17 hallucinate makeup things. It's going to
15:19 pull exactly the work that all of your
15:21 design team and your product team has
15:23 done in the past. So to recap, we took
15:26 the standard designd and we pushed it
15:28 deeper so it can hold the complexity of
15:30 a real product, right? So we made sure
15:32 that all of the components were pointing
15:34 to the metadata and everything that it
15:36 needs to make sure that it is building
15:38 in the best way possible for your
15:40 product. And a little bonus, my team and
15:42 I, we pulled together some of the tools
15:44 that we use every day to build these
15:46 agentic design systems to design and
15:48 code to move faster. And there's a link
15:50 in the description if you want to see
15:52 everything that we have. It's free. And
15:53 if you like this video, please like and
15:56 subscribe. I put content out weekly to
15:58 help product teams get better with AI.
16:00 I'll see you in the next one.